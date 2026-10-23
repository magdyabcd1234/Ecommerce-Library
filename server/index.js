import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer as createViteServer } from 'vite'
import pc from 'picocolors'
import { generateSmartAssistantReply } from '../src/aiAssistant.js'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const isProduction = process.argv.includes('--production')
const requestLimit = 16 * 1024
const rateLimitWindowMs = 10 * 60 * 1000
const requestsPerWindow = isProduction ? 20 : 100
const requestsByAddress = new Map()
const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
}

async function loadEnvironmentFile() {
  try {
    const contents = await readFile(path.join(projectRoot, '.env'), 'utf8')
    for (const line of contents.split(/\r?\n/)) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/)
      if (!match) continue
      let value = match[2].trim()
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      } else {
        const commentIdx = value.indexOf('#')
        if (commentIdx !== -1) {
          value = value.slice(0, commentIdx).trim()
        }
      }
      process.env[match[1]] = value
    }
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
  }
}

function sendJson(response, status, payload) {
  response.writeHead(status, {
    'Cache-Control': 'no-store',
    'Content-Type': 'application/json; charset=utf-8',
    'X-Content-Type-Options': 'nosniff',
  })
  response.end(JSON.stringify(payload))
}

async function readJsonBody(request) {
  const chunks = []
  let size = 0
  for await (const chunk of request) {
    size += chunk.length
    if (size > requestLimit) throw Object.assign(new Error('Request body is too large'), { status: 413 })
    chunks.push(chunk)
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'))
  } catch {
    throw Object.assign(new Error('Request body must be valid JSON'), { status: 400 })
  }
}

function isRateLimited(address) {
  const now = Date.now()
  if (requestsByAddress.size > 10_000) {
    for (const [key, timestamps] of requestsByAddress) {
      if (timestamps.every((time) => now - time >= rateLimitWindowMs)) requestsByAddress.delete(key)
    }
  }
  const recentRequests = (requestsByAddress.get(address) || []).filter((time) => now - time < rateLimitWindowMs)
  if (recentRequests.length >= requestsPerWindow) {
    requestsByAddress.set(address, recentRequests)
    return true
  }
  recentRequests.push(now)
  requestsByAddress.set(address, recentRequests)
  return false
}

async function handleAiChat(request, response) {
  const origin = request.headers.origin
  if (origin) {
    try {
      const originUrl = new URL(origin)
      const hostHeader = request.headers.host || ''
      const isDirectMatch = originUrl.host === hostHeader
      const isLocalhostMatch =
        (originUrl.hostname === 'localhost' || originUrl.hostname === '127.0.0.1') &&
        (hostHeader.startsWith('localhost:') || hostHeader.startsWith('127.0.0.1:'))
      if (!isDirectMatch && !isLocalhostMatch) {
        sendJson(response, 403, { error: 'الطلب غير مسموح من هذا المصدر.' })
        return
      }
    } catch {
      sendJson(response, 403, { error: 'مصدر الطلب غير صالح.' })
      return
    }
  }

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    sendJson(response, 405, { error: 'Method not allowed' })
    return
  }

  if (!request.headers['content-type']?.toLowerCase().startsWith('application/json')) {
    sendJson(response, 415, { error: 'يجب إرسال الطلب بصيغة JSON.' })
    return
  }

  if (isRateLimited(request.socket.remoteAddress || 'unknown')) {
    sendJson(response, 429, { error: 'طلبات كثيرة. حاول مرة أخرى بعد قليل.' })
    return
  }

  let body
  try {
    body = await readJsonBody(request)
  } catch (error) {
    sendJson(response, error.status || 400, { error: error.message })
    return
  }

  const message = typeof body.message === 'string' ? body.message.trim() : ''
  if (!message || message.length > 3000) {
    sendJson(response, 400, { error: 'اكتب سؤالًا لا يتجاوز 3000 حرف.' })
    return
  }

  const apiKey = (process.env.GEMINI_API_KEY || '').trim()
  if (!apiKey || apiKey === 'replace-with-your-gemini-api-key') {
    const reply = generateSmartAssistantReply(message, body.history || [])
    sendJson(response, 200, { reply, mode: 'smart_knowledge_engine' })
    return
  }

  const history = Array.isArray(body.history) ? body.history.slice(-12) : []
  const messages = history
    .filter((item) => item && ['user', 'assistant'].includes(item.role) && typeof item.content === 'string')
    .map((item) => ({ role: item.role, content: item.content.slice(0, 3000) }))
  if (messages.at(-1)?.role !== 'user' || messages.at(-1)?.content !== message) {
    messages.push({ role: 'user', content: message })
  }

  try {
    const apiUrl = process.env.GEMINI_API_URL || 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions'
    let model = (process.env.GEMINI_MODEL || 'gemini-2.5-flash').trim()
    if (model === 'gemini-3.8-flash' || model === 'replace-with-your-model') {
      model = 'gemini-2.5-flash'
    }

    const aiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content: 'أنت مساعد تعليمي عربي لمنصة كود. أجب بوضوح عن البرمجة ولغات العالم المنطوقة، واشرح المفاهيم مع أمثلة آمنة مناسبة للمبتدئين. أجب بلغة المستخدم، ولا تدّع تشغيل الكود أو التحقق من معلومات غير متاحة. في الأمن السيبراني التزم بالتعلم الدفاعي والمختبرات المصرح بها، ولا تقدم تعليمات لاستغلال أنظمة حقيقية.',
          },
          ...messages,
        ],
        temperature: 0.5,
        max_tokens: 1200,
      }),
      signal: AbortSignal.timeout(30_000),
    })

    if (!aiResponse.ok) {
      console.warn(`Gemini API returned HTTP ${aiResponse.status}, falling back to smart assistant.`)
      const reply = generateSmartAssistantReply(message, body.history || [])
      sendJson(response, 200, { reply, mode: 'smart_fallback' })
      return
    }

    const result = await aiResponse.json()
    const reply = result.choices?.[0]?.message?.content
    if (typeof reply !== 'string' || !reply.trim()) {
      const fallbackReply = generateSmartAssistantReply(message, body.history || [])
      sendJson(response, 200, { reply: fallbackReply, mode: 'smart_fallback' })
      return
    }
    sendJson(response, 200, { reply: reply.trim(), mode: 'live_gemini' })
  } catch (error) {
    console.warn('Gemini API call failed, falling back to smart assistant:', error.message)
    const reply = generateSmartAssistantReply(message, body.history || [])
    sendJson(response, 200, { reply, mode: 'smart_fallback' })
  }
}

async function serveProductionFile(request, response) {
  const distDirectory = path.join(projectRoot, 'dist')
  let pathname = '/'
  try {
    pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname)
  } catch {
    response.writeHead(400).end('Bad request')
    return
  }

  const requestedPath = pathname === '/' ? path.join(distDirectory, 'index.html') : path.resolve(distDirectory, `.${pathname}`)
  const filePath = requestedPath.startsWith(`${distDirectory}${path.sep}`) || requestedPath === distDirectory
    ? requestedPath
    : path.join(distDirectory, 'index.html')
  try {
    const file = await readFile(filePath)
    response.writeHead(200, {
      'Content-Type': contentTypes[path.extname(filePath)] || 'application/octet-stream',
      'X-Content-Type-Options': 'nosniff',
    })
    response.end(file)
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
    if (path.extname(pathname)) {
      response.writeHead(404).end('Not found')
      return
    }
    const indexHtml = await readFile(path.join(distDirectory, 'index.html'))
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    response.end(indexHtml)
  }
}

await loadEnvironmentFile()
const port = Number(process.env.PORT || 5173)

let vite
const server = createServer(async (request, response) => {
  if (request.url?.split('?')[0] === '/api/ai-chat') {
    await handleAiChat(request, response)
    return
  }

  if (isProduction) {
    await serveProductionFile(request, response)
    return
  }

  vite.middlewares(request, response, (error) => {
    if (error) {
      console.error('Vite middleware failed:', error)
      if (!response.headersSent) response.writeHead(500)
      response.end('Internal server error')
    } else if (!response.headersSent) {
      response.writeHead(404).end('Not found')
    }
  })
})

if (!isProduction) {
  vite = await createViteServer({
    appType: 'spa',
    server: {
      hmr: { server },
      middlewareMode: true,
    },
  })
}

function getNetworkIp() {
  try {
    const nets = os.networkInterfaces()
    for (const name of Object.keys(nets)) {
      for (const net of nets[name] || []) {
        if (net.family === 'IPv4' && !net.internal) {
          return net.address
        }
      }
    }
  } catch {
    // ignore network lookup failures
  }
  return null
}

function printServerBanner(port, mode) {
  const localUrl = `http://localhost:${port}/`
  const networkIp = getNetworkIp()
  const networkUrl = networkIp ? `http://${networkIp}:${port}/` : null
  const colorUrl = (url) => pc.cyan(pc.underline(url.replace(/:(\d+)\//, (_, p) => `:${pc.bold(p)}/`)))

  console.log('')
  console.log(`  ${pc.green('➜')}  ${pc.bold('Local')}:   ${colorUrl(localUrl)}`)
  if (networkUrl) {
    console.log(`  ${pc.green('➜')}  ${pc.bold('Network')}: ${colorUrl(networkUrl)}`)
  } else {
    console.log(`  ${pc.green('➜')}  ${pc.dim('Network')}: ${pc.dim('use --host to expose')}`)
  }

  if (mode === 'production') {
    console.log(`  ${pc.dim('Mode')}:   ${pc.yellow('production')}`)
  } else {
    console.log(`  ${pc.dim('➜')}  ${pc.dim('press')} ${pc.bold('h + enter')} ${pc.dim('to show help')}\n`)
  }
}

function listenOnAvailablePort(candidate, attemptsRemaining = 20) {
  const onListening = () => {
    server.off('error', onError)
    const listeningPort = server.address().port

    if (vite) {
      const networkIp = getNetworkIp()
      vite.resolvedUrls = {
        local: [`http://localhost:${listeningPort}/`],
        network: networkIp ? [`http://${networkIp}:${listeningPort}/`] : [],
      }
      printServerBanner(listeningPort, 'development')
      try {
        if (process.stdin.isTTY) {
          vite.bindCLIShortcuts({ print: false })
        }
      } catch {
        // ignore shortcut binding errors
      }
    } else {
      printServerBanner(listeningPort, 'production')
    }
  }

  const onError = (error) => {
    server.off('error', onError)
    server.off('listening', onListening)
    if (error.code !== 'EADDRINUSE' || attemptsRemaining === 0) throw error
    console.warn(`Port ${candidate} is already in use; trying ${candidate + 1}.`)
    listenOnAvailablePort(candidate + 1, attemptsRemaining - 1)
  }

  server.once('error', onError)
  server.once('listening', onListening)
  server.listen(candidate, '0.0.0.0')
}

listenOnAvailablePort(port)
