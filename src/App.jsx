import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowLeft, ArrowUpLeft, Award, Bookmark, Bot, Check, CheckCircle2, ChevronLeft, ChevronRight,
  ClipboardCheck, Code2, Command, Copy, Download, Flame, Mail, MapPin, Menu, MessageCircle, Monitor, Play, Printer,
  RotateCcw, Search, Send, Share2, Smartphone, Sparkles, Star, X,
} from 'lucide-react'
import { getCourseQuiz } from './quizzes.js'
import { generateSmartAssistantReply } from './aiAssistant.js'


const categories = ['الكل', 'تطوير الويب', 'تطبيقات الموبايل', 'الذكاء الاصطناعي', 'قواعد البيانات', 'اللغات']

const lessonsPerBook = 188
const worldLanguageLessons = 500
const whatsappUrl = 'https://wa.me/201205845139'

const worldLanguages = [
  {
    id: 'english',
    title: 'الإنجليزية',
    language: 'الإنجليزية',
    icon: 'EN',
    color: 'from-blue-300/20 to-indigo-500/5',
    iconColor: 'text-blue-300',
    level: 'مبتدئ إلى متقدم',
    teacher: 'مريم خالد',
    phrases: [
      ['I learned the word {word}.', 'آي ليرند ذَ وورد {word}.', 'تعلمت كلمة {word}.'],
      ['Can you say {word}?', 'كان يو ساي {word}؟', 'هل يمكنك نطق كلمة {word}؟'],
      ['How do you pronounce {word}?', 'هاو دو يو بروناونس {word}؟', 'كيف تنطق كلمة {word}؟'],
      ['I can remember {word}.', 'آي كان رِمِمبر {word}.', 'أستطيع تذكّر كلمة {word}.'],
      ['I am learning {word}.', 'آي آم ليرنينغ {meaning}.', 'أنا أتعلم {meaning}.'],
      ['I would like {word}, please.', 'آي وُد لايك {meaning}، بليز.', 'أريد {meaning} من فضلك.'],
      ['Where is {word}?', 'وير إز {meaning}؟', 'أين {meaning}؟'],
      ['How much is {word}?', 'هاو ماتش إز {meaning}؟', 'بكم {meaning}؟'],
      ['I need {word}.', 'آي نيد {meaning}.', 'أحتاج إلى {meaning}.'],
      ['Can you help me with {word}?', 'كان يو هيلب مي وِذ {meaning}؟', 'هل يمكنك مساعدتي في {meaning}؟'],
      ['I work with {word}.', 'آي وورك وِذ {meaning}.', 'أعمل مع {meaning}.'],
      ['I went to {word} yesterday.', 'آي وِنت تو {meaning} يسترداي.', 'ذهبت إلى {meaning} أمس.'],
      ['Tomorrow I will visit {word}.', 'تومورو آي وِل فيزِت {meaning}.', 'سأزور {meaning} غدًا.'],
      ['I have already seen {word}.', 'آي هاف أولريدي سين {meaning}.', 'لقد رأيت {meaning} بالفعل.'],
      ['I have been studying {word} for a year.', 'آي هاف بِين ستَدِينغ {meaning} فور أ يير.', 'أدرس {meaning} منذ عام.'],
      ['If I find {word}, I will call you.', 'إف آي فايند {meaning}، آي وِل كول يو.', 'إذا وجدت {meaning}، فسأتصل بك.'],
      ['Although I like {word}, I need more practice.', 'أولذو آي لايك {meaning}، آي نيد مور براكتِس.', 'مع أنني أحب {meaning}، أحتاج إلى مزيد من التدريب.'],
      ['The reason I chose {word} is its value.', 'ذَ ريزن آي تشوز {meaning} إز إتس فاليو.', 'سبب اختياري لـ{meaning} هو قيمته.'],
      ['By the time we arrive, {word} will be ready.', 'باي ذَ تايم وي أرايف، {meaning} وِل بي رِدي.', 'بحلول وقت وصولنا، سيكون {meaning} جاهزًا.'],
      ['Could you explain how {word} works?', 'كود يو إكسبلين هاو {meaning} ووركس؟', 'هل يمكنك شرح طريقة عمل {meaning}؟'],
    ],
    words: [
      ['the book', 'الكتاب'], ['the lesson', 'الدرس'], ['the school', 'المدرسة'], ['the library', 'المكتبة'], ['the friend', 'الصديق'],
      ['the family', 'العائلة'], ['the city', 'المدينة'], ['the station', 'المحطة'], ['the hotel', 'الفندق'], ['the restaurant', 'المطعم'],
      ['the meeting', 'الاجتماع'], ['the project', 'المشروع'], ['the computer', 'الحاسوب'], ['the message', 'الرسالة'], ['the question', 'السؤال'],
      ['the answer', 'الإجابة'], ['the opportunity', 'الفرصة'], ['the plan', 'الخطة'], ['the journey', 'الرحلة'], ['the appointment', 'الموعد'],
      ['the agreement', 'الاتفاق'], ['the experience', 'التجربة'], ['the solution', 'الحل'], ['the suggestion', 'الاقتراح'], ['the achievement', 'الإنجاز'],
    ],
  },
  {
    id: 'spanish',
    title: 'الإسبانية',
    language: 'الإسبانية',
    icon: 'ES',
    color: 'from-red-300/20 to-yellow-400/5',
    iconColor: 'text-red-300',
    level: 'مبتدئ إلى متقدم',
    teacher: 'سارة علي',
    phrases: [
      ['He aprendido la palabra {word}.', 'إي أبرينديدو لا بالابرا {word}.', 'تعلمت كلمة {word}.'],
      ['¿Puedes decir {word}?', 'بويديس ديسير {word}؟', 'هل يمكنك نطق كلمة {word}؟'],
      ['¿Cómo se pronuncia {word}?', 'كومو سي برونونسيا {word}؟', 'كيف تنطق كلمة {word}؟'],
      ['Puedo recordar {word}.', 'بويدو ريكوردار {word}.', 'أستطيع تذكّر كلمة {word}.'],
      ['Estoy aprendiendo {word}.', 'إستوي أبريندييندو {meaning}.', 'أنا أتعلم {meaning}.'],
      ['Quisiera {word}, por favor.', 'كيسييرا {meaning}، بور فابور.', 'أريد {meaning}، من فضلك.'],
      ['¿Dónde está {word}?', 'دوندي إستا {meaning}؟', 'أين {meaning}؟'],
      ['¿Cuánto cuesta {word}?', 'كوانتو كويستا {meaning}؟', 'بكم {meaning}؟'],
      ['Necesito {word}.', 'نيسيسيتو {meaning}.', 'أحتاج إلى {meaning}.'],
      ['¿Puedes ayudarme con {word}?', 'بويديس أيودارمي كون {meaning}؟', 'هل يمكنك مساعدتي في {meaning}؟'],
      ['Trabajo con {word}.', 'تراباخو كون {meaning}.', 'أعمل مع {meaning}.'],
      ['Ayer fui a {word}.', 'أييير فوي أ {meaning}.', 'ذهبت إلى {meaning} أمس.'],
      ['Mañana visitaré {word}.', 'مانيانا بيسيتاري {meaning}.', 'سأزور {meaning} غدًا.'],
      ['Ya he visto {word}.', 'يا إي بيستو {meaning}.', 'لقد رأيت {meaning} بالفعل.'],
      ['Llevo un año estudiando {word}.', 'ييبو أون أنيو إستوديانْدو {meaning}.', 'أدرس {meaning} منذ عام.'],
      ['Si encuentro {word}, te llamaré.', 'سي إنكوينترو {meaning}، تي ياماري.', 'إذا وجدت {meaning}، فسأتصل بك.'],
      ['Aunque me gusta {word}, necesito practicar más.', 'أونكي مي غوستا {meaning}، نيسيسيتو براكتیکار ماس.', 'مع أنني أحب {meaning}، أحتاج إلى مزيد من التدريب.'],
      ['Elegí {word} por su valor.', 'إليخي {meaning} بور سو بالور.', 'اخترت {meaning} بسبب قيمته.'],
      ['Cuando lleguemos, {word} estará listo.', 'كواندو ييغيموس، {meaning} إستارا ليستو.', 'عندما نصل، سيكون {meaning} جاهزًا.'],
      ['¿Podrías explicar cómo funciona {word}?', 'بودرياس إكسبليكار كومو فونسيونا {meaning}؟', 'هل يمكنك شرح طريقة عمل {meaning}؟'],
    ],
    words: [
      ['el libro', 'الكتاب'], ['la lección', 'الدرس'], ['la escuela', 'المدرسة'], ['la biblioteca', 'المكتبة'], ['el amigo', 'الصديق'],
      ['la familia', 'العائلة'], ['la ciudad', 'المدينة'], ['la estación', 'المحطة'], ['el hotel', 'الفندق'], ['el restaurante', 'المطعم'],
      ['la reunión', 'الاجتماع'], ['el proyecto', 'المشروع'], ['el ordenador', 'الحاسوب'], ['el mensaje', 'الرسالة'], ['la pregunta', 'السؤال'],
      ['la respuesta', 'الإجابة'], ['la oportunidad', 'الفرصة'], ['el plan', 'الخطة'], ['el viaje', 'الرحلة'], ['la cita', 'الموعد'],
      ['el acuerdo', 'الاتفاق'], ['la experiencia', 'التجربة'], ['la solución', 'الحل'], ['la sugerencia', 'الاقتراح'], ['el logro', 'الإنجاز'],
    ],
  },
  {
    id: 'french',
    title: 'الفرنسية',
    language: 'الفرنسية',
    icon: 'FR',
    color: 'from-blue-300/20 to-red-400/5',
    iconColor: 'text-blue-300',
    level: 'مبتدئ إلى متقدم',
    teacher: 'ليلى حسن',
    phrases: [
      ['J’ai appris le mot {word}.', 'جي أبري لو مو {word}.', 'تعلمت كلمة {word}.'],
      ['Pouvez-vous dire {word} ?', 'بوفيه فو دير {word}؟', 'هل يمكنك نطق كلمة {word}؟'],
      ['Comment prononce-t-on {word} ?', 'كومان برونونس تون {word}؟', 'كيف تنطق كلمة {word}؟'],
      ['Je peux me souvenir de {word}.', 'جو بو مو سوفنير دو {word}.', 'أستطيع تذكّر كلمة {word}.'],
      ['J’apprends {word}.', 'جابران {meaning}.', 'أنا أتعلم {meaning}.'],
      ['Je voudrais {word}, s’il vous plaît.', 'جو فودري {meaning}، سيل فو بليه.', 'أريد {meaning}، من فضلك.'],
      ['Où se trouve {word} ?', 'أو سو تروف {meaning}؟', 'أين {meaning}؟'],
      ['Combien coûte {word} ?', 'كومبيان كوت {meaning}؟', 'بكم {meaning}؟'],
      ['J’ai besoin de {word}.', 'جي بوزوان دو {meaning}.', 'أحتاج إلى {meaning}.'],
      ['Pouvez-vous m’aider avec {word} ?', 'بوفيه فو ميدي أفيك {meaning}؟', 'هل يمكنك مساعدتي في {meaning}؟'],
      ['Je travaille avec {word}.', 'جو ترافاي أفيك {meaning}.', 'أعمل مع {meaning}.'],
      ['Je suis allé à {word} hier.', 'جو سوي زالي آ {meaning} إيير.', 'ذهبت إلى {meaning} أمس.'],
      ['Demain, je visiterai {word}.', 'دومان، جو فيزيتري {meaning}.', 'سأزور {meaning} غدًا.'],
      ['J’ai déjà vu {word}.', 'جي ديجا فو {meaning}.', 'لقد رأيت {meaning} بالفعل.'],
      ['J’étudie {word} depuis un an.', 'جيتودي {meaning} دوبي أَن أَن.', 'أدرس {meaning} منذ عام.'],
      ['Si je trouve {word}, je vous appellerai.', 'سي جو تروف {meaning}، جو فو زابيلري.', 'إذا وجدت {meaning}، فسأتصل بك.'],
      ['Bien que j’aime {word}, je dois pratiquer davantage.', 'بيان كو جيم {meaning}، جو دوا براتيكي دافانتاج.', 'مع أنني أحب {meaning}، أحتاج إلى مزيد من التدريب.'],
      ['J’ai choisi {word} pour sa valeur.', 'جي شوازي {meaning} بور سا فالور.', 'اخترت {meaning} بسبب قيمته.'],
      ['Quand nous arriverons, {word} sera prêt.', 'كان نو زاريفرون، {meaning} سرا بري.', 'عندما نصل، سيكون {meaning} جاهزًا.'],
      ['Pourriez-vous expliquer comment fonctionne {word} ?', 'بورييه فو إكسبليكي كومون فونكسيون {meaning}؟', 'هل يمكنك شرح طريقة عمل {meaning}؟'],
    ],
    words: [
      ['le livre', 'الكتاب'], ['la leçon', 'الدرس'], ['l’école', 'المدرسة'], ['la bibliothèque', 'المكتبة'], ['l’ami', 'الصديق'],
      ['la famille', 'العائلة'], ['la ville', 'المدينة'], ['la gare', 'المحطة'], ['l’hôtel', 'الفندق'], ['le restaurant', 'المطعم'],
      ['la réunion', 'الاجتماع'], ['le projet', 'المشروع'], ['l’ordinateur', 'الحاسوب'], ['le message', 'الرسالة'], ['la question', 'السؤال'],
      ['la réponse', 'الإجابة'], ['l’occasion', 'الفرصة'], ['le plan', 'الخطة'], ['le voyage', 'الرحلة'], ['le rendez-vous', 'الموعد'],
      ['l’accord', 'الاتفاق'], ['l’expérience', 'التجربة'], ['la solution', 'الحل'], ['la suggestion', 'الاقتراح'], ['la réussite', 'الإنجاز'],
    ],
  },
  {
    id: 'german',
    title: 'الألمانية',
    language: 'الألمانية',
    icon: 'DE',
    color: 'from-yellow-300/20 to-red-500/5',
    iconColor: 'text-yellow-300',
    level: 'مبتدئ إلى متقدم',
    teacher: 'يوسف محمود',
    phrases: [
      ['Ich habe das Wort {word} gelernt.', 'إيش هابه داس فورت {word} جِليرنت.', 'تعلمت كلمة {word}.'],
      ['Können Sie {word} sagen?', 'كونن زي {word} زاجن؟', 'هل يمكنك نطق كلمة {word}؟'],
      ['Wie spricht man {word} aus?', 'في شبرخت مان {word} آوس؟', 'كيف تنطق كلمة {word}؟'],
      ['Ich kann mich an {word} erinnern.', 'إيش كان ميش آن {word} إرينرن.', 'أستطيع تذكّر كلمة {word}.'],
      ['Ich lerne {word}.', 'إيش ليرنه {meaning}.', 'أنا أتعلم {meaning}.'],
      ['Ich hätte gern {word}, bitte.', 'إيش هِته جيرن {meaning}، بِته.', 'أريد {meaning}، من فضلك.'],
      ['Wo ist {word}?', 'فو إِست {meaning}؟', 'أين {meaning}؟'],
      ['Wie viel kostet {word}?', 'في فيل كوستت {meaning}؟', 'بكم {meaning}؟'],
      ['Ich brauche {word}.', 'إيش براوخه {meaning}.', 'أحتاج إلى {meaning}.'],
      ['Können Sie mir mit {word} helfen?', 'كونن زي مير مِت {meaning} هِلفن؟', 'هل يمكنك مساعدتي في {meaning}؟'],
      ['Ich arbeite mit {word}.', 'إيش أربايته مِت {meaning}.', 'أعمل مع {meaning}.'],
      ['Gestern bin ich zu {word} gegangen.', 'جسترن بِِن إيش تسو {meaning} جِجانجن.', 'ذهبت إلى {meaning} أمس.'],
      ['Morgen werde ich {word} besuchen.', 'مورجن فيرده إيش {meaning} بِزوخن.', 'سأزور {meaning} غدًا.'],
      ['Ich habe {word} schon gesehen.', 'إيش هابه {meaning} شون جِزين.', 'لقد رأيت {meaning} بالفعل.'],
      ['Ich lerne seit einem Jahr {word}.', 'إيش ليرنه زايت آينم يار {meaning}.', 'أدرس {meaning} منذ عام.'],
      ['Wenn ich {word} finde, rufe ich Sie an.', 'فِن إيش {meaning} فِنده، روفه إيش زي آن.', 'إذا وجدت {meaning}، فسأتصل بك.'],
      ['Obwohl ich {word} mag, muss ich mehr üben.', 'أوبفول إيش {meaning} ماج، موس إيش مير أوبن.', 'مع أنني أحب {meaning}، أحتاج إلى مزيد من التدريب.'],
      ['Ich habe {word} wegen seines Wertes gewählt.', 'إيش هابه {meaning} فيجن زاينس فيرتس جِفيلت.', 'اخترت {meaning} بسبب قيمته.'],
      ['Wenn wir ankommen, wird {word} bereit sein.', 'فِن فير آنكومن، فيرت {meaning} برايت زاين.', 'عندما نصل، سيكون {meaning} جاهزًا.'],
      ['Könnten Sie erklären, wie {word} funktioniert?', 'كونتن زي إركليرن، في {meaning} فونكسيونيرت؟', 'هل يمكنك شرح طريقة عمل {meaning}؟'],
    ],
    words: [
      ['das Buch', 'الكتاب'], ['die Lektion', 'الدرس'], ['die Schule', 'المدرسة'], ['die Bibliothek', 'المكتبة'], ['der Freund', 'الصديق'],
      ['die Familie', 'العائلة'], ['die Stadt', 'المدينة'], ['der Bahnhof', 'المحطة'], ['das Hotel', 'الفندق'], ['das Restaurant', 'المطعم'],
      ['das Treffen', 'الاجتماع'], ['das Projekt', 'المشروع'], ['der Computer', 'الحاسوب'], ['die Nachricht', 'الرسالة'], ['die Frage', 'السؤال'],
      ['die Antwort', 'الإجابة'], ['die Gelegenheit', 'الفرصة'], ['der Plan', 'الخطة'], ['die Reise', 'الرحلة'], ['der Termin', 'الموعد'],
      ['die Vereinbarung', 'الاتفاق'], ['die Erfahrung', 'التجربة'], ['die Lösung', 'الحل'], ['der Vorschlag', 'الاقتراح'], ['der Erfolg', 'الإنجاز'],
    ],
  },
  {
    id: 'italian',
    title: 'الإيطالية',
    language: 'الإيطالية',
    icon: 'IT',
    color: 'from-green-300/20 to-red-400/5',
    iconColor: 'text-green-300',
    level: 'مبتدئ إلى متقدم',
    teacher: 'أحمد سامي',
    phrases: [
      ['Ho imparato la parola {word}.', 'أو إمبراتو لا بارولا {word}.', 'تعلمت كلمة {word}.'],
      ['Puoi dire {word}?', 'بووي ديري {word}؟', 'هل يمكنك نطق كلمة {word}؟'],
      ['Come si pronuncia {word}?', 'كومي سي برونونتشا {word}؟', 'كيف تنطق كلمة {word}؟'],
      ['Riesco a ricordare {word}.', 'رييسكو آ ريكورداري {word}.', 'أستطيع تذكّر كلمة {word}.'],
      ['Sto imparando {word}.', 'ستو إمبراندو {meaning}.', 'أنا أتعلم {meaning}.'],
      ['Vorrei {word}, per favore.', 'فورِّي {meaning}، بير فافوري.', 'أريد {meaning}، من فضلك.'],
      ['Dov’è {word}?', 'دوفي {meaning}؟', 'أين {meaning}؟'],
      ['Quanto costa {word}?', 'كوانتو كوستا {meaning}؟', 'بكم {meaning}؟'],
      ['Ho bisogno di {word}.', 'أو بيزونيو دي {meaning}.', 'أحتاج إلى {meaning}.'],
      ['Puoi aiutarmi con {word}?', 'بووي أيؤتارمي كون {meaning}؟', 'هل يمكنك مساعدتي في {meaning}؟'],
      ['Lavoro con {word}.', 'لافورو كون {meaning}.', 'أعمل مع {meaning}.'],
      ['Ieri sono andato a {word}.', 'ييري سونو أنداتو آ {meaning}.', 'ذهبت إلى {meaning} أمس.'],
      ['Domani visiterò {word}.', 'دوماني فيزيترُ {meaning}.', 'سأزور {meaning} غدًا.'],
      ['Ho già visto {word}.', 'أو جا فيستو {meaning}.', 'لقد رأيت {meaning} بالفعل.'],
      ['Studio {word} da un anno.', 'ستوديو {meaning} دا أون آنو.', 'أدرس {meaning} منذ عام.'],
      ['Se trovo {word}, ti chiamo.', 'سي تروفو {meaning}، تي كيامو.', 'إذا وجدت {meaning}، فسأتصل بك.'],
      ['Anche se mi piace {word}, devo esercitarmi di più.', 'آنكي سي مي بياتشي {meaning}، ديفو إزيرتشيتارمي دي بيو.', 'مع أنني أحب {meaning}، أحتاج إلى مزيد من التدريب.'],
      ['Ho scelto {word} per il suo valore.', 'أو شيلتو {meaning} بير إيل سو فالوري.', 'اخترت {meaning} بسبب قيمته.'],
      ['Quando arriveremo, {word} sarà pronto.', 'كواندو أريفيريمو، {meaning} سارا برونتو.', 'عندما نصل، سيكون {meaning} جاهزًا.'],
      ['Potresti spiegare come funziona {word}?', 'بوترستي سبيغاري كومي فونتسيونا {meaning}؟', 'هل يمكنك شرح طريقة عمل {meaning}؟'],
    ],
    words: [
      ['il libro', 'الكتاب'], ['la lezione', 'الدرس'], ['la scuola', 'المدرسة'], ['la biblioteca', 'المكتبة'], ['l’amico', 'الصديق'],
      ['la famiglia', 'العائلة'], ['la città', 'المدينة'], ['la stazione', 'المحطة'], ['l’albergo', 'الفندق'], ['il ristorante', 'المطعم'],
      ['la riunione', 'الاجتماع'], ['il progetto', 'المشروع'], ['il computer', 'الحاسوب'], ['il messaggio', 'الرسالة'], ['la domanda', 'السؤال'],
      ['la risposta', 'الإجابة'], ['l’opportunità', 'الفرصة'], ['il piano', 'الخطة'], ['il viaggio', 'الرحلة'], ['l’appuntamento', 'الموعد'],
      ['l’accordo', 'الاتفاق'], ['l’esperienza', 'التجربة'], ['la soluzione', 'الحل'], ['il suggerimento', 'الاقتراح'], ['il traguardo', 'الإنجاز'],
    ],
  },
  {
    id: 'portuguese',
    title: 'البرتغالية',
    language: 'البرتغالية',
    icon: 'PT',
    color: 'from-green-300/20 to-yellow-400/5',
    iconColor: 'text-green-300',
    level: 'مبتدئ إلى متقدم',
    teacher: 'مريم خالد',
    phrases: [
      ['Aprendi a palavra {word}.', 'أبريندي آ بالافرا {word}.', 'تعلمت كلمة {word}.'],
      ['Você pode dizer {word}?', 'فوسي بودجي ديزر {word}؟', 'هل يمكنك نطق كلمة {word}؟'],
      ['Como se pronuncia {word}?', 'كومو سي برونونسيا {word}؟', 'كيف تنطق كلمة {word}؟'],
      ['Consigo lembrar de {word}.', 'كونسيغو ليمبرار دجي {word}.', 'أستطيع تذكّر كلمة {word}.'],
      ['Estou aprendendo {word}.', 'إستو أبرينديندو {word}.', 'أنا أتعلم {meaning}.'],
      ['Eu gostaria de {word}, por favor.', 'إيو غوستاريا دجي {word}، بور فافور.', 'أريد {meaning}، من فضلك.'],
      ['Onde fica {word}?', 'أوندجي فيكا {word}؟', 'أين {meaning}؟'],
      ['Quanto custa {word}?', 'كوانتو كوستا {word}؟', 'بكم {meaning}؟'],
      ['Preciso de {word}.', 'بريسيسو دجي {word}.', 'أحتاج إلى {meaning}.'],
      ['Você pode me ajudar com {word}?', 'فوسي بودجي مي أجودار كون {word}؟', 'هل يمكنك مساعدتي في {meaning}؟'],
      ['Trabalho com {word}.', 'تراباليو كون {word}.', 'أعمل مع {meaning}.'],
      ['Ontem fui a {word}.', 'أونتيم فوي آ {word}.', 'ذهبت إلى {meaning} أمس.'],
      ['Amanhã visitarei {word}.', 'أمانيا فيزيتاري {word}.', 'سأزور {meaning} غدًا.'],
      ['Já vi {word}.', 'جا في {word}.', 'لقد رأيت {meaning} بالفعل.'],
      ['Estudo {word} há um ano.', 'إستودو {word} آ أون آنو.', 'أدرس {meaning} منذ عام.'],
      ['Se eu encontrar {word}, vou ligar para você.', 'سي إيو إنكونترار {word}، فو ليغار بارا فوسي.', 'إذا وجدت {meaning}، فسأتصل بك.'],
      ['Embora eu goste de {word}, preciso praticar mais.', 'إمبورا إيو غوستي دجي {word}، بريسيسو براتيكا ماس.', 'مع أنني أحب {meaning}، أحتاج إلى مزيد من التدريب.'],
      ['Escolhi {word} por causa do seu valor.', 'إسكولهي {word} بور كاوزا دو سو فالور.', 'اخترت {meaning} بسبب قيمته.'],
      ['Quando chegarmos, {word} estará pronto.', 'كواندو شيغارموس، {word} إشتارا برونتو.', 'عندما نصل، سيكون {meaning} جاهزًا.'],
      ['Você poderia explicar como {word} funciona?', 'فوسي بوديريا إكسبليكار كومو {word} فونسيونا؟', 'هل يمكنك شرح طريقة عمل {meaning}؟'],
    ],
    words: [
      ['o livro', 'الكتاب'], ['a lição', 'الدرس'], ['a escola', 'المدرسة'], ['a biblioteca', 'المكتبة'], ['o amigo', 'الصديق'],
      ['a família', 'العائلة'], ['a cidade', 'المدينة'], ['a estação', 'المحطة'], ['o hotel', 'الفندق'], ['o restaurante', 'المطعم'],
      ['a reunião', 'الاجتماع'], ['o projeto', 'المشروع'], ['o computador', 'الحاسوب'], ['a mensagem', 'الرسالة'], ['a pergunta', 'السؤال'],
      ['a resposta', 'الإجابة'], ['a oportunidade', 'الفرصة'], ['o plano', 'الخطة'], ['a viagem', 'الرحلة'], ['o compromisso', 'الموعد'],
      ['o acordo', 'الاتفاق'], ['a experiência', 'التجربة'], ['a solução', 'الحل'], ['a sugestão', 'الاقتراح'], ['a conquista', 'الإنجاز'],
    ],
  },
  {
    id: 'japanese',
    title: 'اليابانية',
    language: 'اليابانية',
    icon: 'JP',
    color: 'from-red-300/20 to-pink-500/5',
    iconColor: 'text-red-300',
    level: 'مبتدئ إلى متقدم',
    teacher: 'سارة علي',
    phrases: [
      ['「{word}」という言葉を学びました。', '「{word}」تو إيو كوتوبا أو مانابيماشيتا.', 'تعلمت كلمة {meaning}.'],
      ['「{word}」と言ってもらえますか？', '「{word}」تو إتّيه مورايمس كا؟', 'هل يمكنك نطق كلمة {meaning}؟'],
      ['「{word}」はどう発音しますか？', '「{word}」وا دوو هاتسون شيماس كا؟', 'كيف تنطق كلمة {meaning}؟'],
      ['「{word}」を覚えられます。', '「{word}」أو أوبراريمس.', 'أستطيع تذكّر كلمة {meaning}.'],
      ['「{word}」を勉強しています。', '「{word}」أو بنكيو شيتا إيمس.', 'أنا أتعلم {meaning}.'],
      ['「{word}」をお願いします。', '「{word}」أو أونيغاي شيماس.', 'أريد {meaning}، من فضلك.'],
      ['「{word}」はどこですか？', '「{word}」وا دوكو ديس كا؟', 'أين {meaning}؟'],
      ['「{word}」はいくらですか？', '「{word}」وا إيكورا ديس كا؟', 'بكم {meaning}؟'],
      ['「{word}」が必要です。', '「{word}」غا هيتسيوو ديس.', 'أحتاج إلى {meaning}.'],
      ['「{word}」について手伝っていただけますか？', '「{word}」ني تسويتِه تيتسوداتّيه إيتاداكيماس كا؟', 'هل يمكنك مساعدتي في {meaning}؟'],
      ['「{word}」を使って仕事をします。', '「{word}」أو تسوكاتّيه شيغوتو أو شيماس.', 'أعمل مع {meaning}.'],
      ['昨日「{word}」へ行きました。', 'كينو «{word}» إيه إكيماشيتا.', 'ذهبت إلى {meaning} أمس.'],
      ['明日「{word}」を訪れます。', 'أشيتا «{word}» أو أوزوريمس.', 'سأزور {meaning} غدًا.'],
      ['もう「{word}」を見ました。', 'موو «{word}» أو ميمشيتا.', 'لقد رأيت {meaning} بالفعل.'],
      ['一年間「{word}」を勉強しています。', 'إيتشينينكان «{word}» أو بنكيو شيتا إيمس.', 'أدرس {meaning} منذ عام.'],
      ['「{word}」を見つけたら、電話します。', '«{word}» أو ميتسوكيتارا، دينوا شيمس.', 'إذا وجدت {meaning}، فسأتصل بك.'],
      ['「{word}」は好きですが、もっと練習が必要です。', '«{word}» وا سوكي ديس غا، موتّو رينشوو غا هيتسيوو ديس.', 'مع أنني أحب {meaning}، أحتاج إلى مزيد من التدريب.'],
      ['価値があるので「{word}」を選びました。', 'كاتشي غا آرو نودِه «{word}» أو إيرابيمشيتا.', 'اخترت {meaning} بسبب قيمته.'],
      ['着いたら「{word}」は準備できています。', 'تسويتارا «{word}» وا جونبي ديكيتِه إيمس.', 'عندما نصل، سيكون {meaning} جاهزًا.'],
      ['「{word}」の仕組みを説明していただけますか？', '«{word}» نو شيكومي أو سيتسومِي شيتِه إيتاداكيماس كا؟', 'هل يمكنك شرح طريقة عمل {meaning}؟'],
    ],
    words: [
      ['本 (hon)', 'الكتاب'], ['レッスン (ressun)', 'الدرس'], ['学校 (gakkou)', 'المدرسة'], ['図書館 (toshokan)', 'المكتبة'], ['友達 (tomodachi)', 'الصديق'],
      ['家族 (kazoku)', 'العائلة'], ['街 (machi)', 'المدينة'], ['駅 (eki)', 'المحطة'], ['ホテル (hoteru)', 'الفندق'], ['レストラン (resutoran)', 'المطعم'],
      ['会議 (kaigi)', 'الاجتماع'], ['プロジェクト (purojekuto)', 'المشروع'], ['コンピューター (konpyuutaa)', 'الحاسوب'], ['メッセージ (messeeji)', 'الرسالة'], ['質問 (shitsumon)', 'السؤال'],
      ['答え (kotae)', 'الإجابة'], ['機会 (kikai)', 'الفرصة'], ['計画 (keikaku)', 'الخطة'], ['旅行 (ryokou)', 'الرحلة'], ['予約 (yoyaku)', 'الموعد'],
      ['合意 (goui)', 'الاتفاق'], ['経験 (keiken)', 'التجربة'], ['解決策 ( kaiketsusaku)', 'الحل'], ['提案 (teian)', 'الاقتراح'], ['達成 (tassei)', 'الإنجاز'],
    ],
  },
  {
    id: 'chinese',
    title: 'الصينية',
    language: 'الصينية',
    icon: 'ZH',
    color: 'from-red-300/20 to-yellow-400/5',
    iconColor: 'text-red-300',
    level: 'مبتدئ إلى متقدم',
    teacher: 'عمر ناصر',
    phrases: [
      ['我学会了“{word}”这个词。', 'وُه شيويه هوي لِه «{word}» جِه جُو.', 'تعلمت كلمة {meaning}.'],
      ['你可以说“{word}”吗？', 'ني كِه يي شوُو «{word}» ما؟', 'هل يمكنك نطق كلمة {meaning}؟'],
      ['“{word}”怎么发音？', '«{word}» زِن مَه فَا يِن؟', 'كيف تنطق كلمة {meaning}؟'],
      ['我能记住“{word}”。', 'وُه نِن جِي جُو «{word}».', 'أستطيع تذكّر كلمة {meaning}.'],
      ['我正在学习“{word}”。', 'وُه جِنج زاي شيويه شي «{word}».', 'أنا أتعلم {meaning}.'],
      ['请给我“{word}”，谢谢。', 'تشينغ جِي وُه «{word}»، شييه شييه.', 'أريد {meaning}، من فضلك.'],
      ['“{word}”在哪里？', '«{word}» زاي نالي؟', 'أين {meaning}؟'],
      ['“{word}”多少钱？', '«{word}» دوو شاو تشيان؟', 'بكم {meaning}؟'],
      ['我需要“{word}”。', 'وُه شوِي ياو «{word}».', 'أحتاج إلى {meaning}.'],
      ['你能帮我处理“{word}”吗？', 'ني نِن بانغ وُه تشو لي «{word}» ما؟', 'هل يمكنك مساعدتي في {meaning}؟'],
      ['我用“{word}”工作。', 'وُه يونغ «{word}» قونغ زوو.', 'أعمل مع {meaning}.'],
      ['我昨天去了“{word}”。', 'وُه زُوُو تيان تشيو لِه «{word}».', 'ذهبت إلى {meaning} أمس.'],
      ['我明天会去“{word}”。', 'وُه مينغ تيان هوي تشيو «{word}».', 'سأزور {meaning} غدًا.'],
      ['我已经看过“{word}”了。', 'وُه يِي جينغ كان قوُو «{word}» لِه.', 'لقد رأيت {meaning} بالفعل.'],
      ['我学“{word}”一年了。', 'وُه شيويه «{word}» يِي نيان لِه.', 'أدرس {meaning} منذ عام.'],
      ['如果我找到“{word}”，我会给你打电话。', 'رو قوُو وُه جاو داو «{word}»، وُه هوي دِي نِي دا ديان هوا.', 'إذا وجدت {meaning}، فسأتصل بك.'],
      ['虽然我喜欢“{word}”，但我需要多练习。', 'سوي ران وُه شي هوان «{word}»، دان وُه شوِي ياو دوو ليان شي.', 'مع أنني أحب {meaning}، أحتاج إلى مزيد من التدريب.'],
      ['我因为它的价值选择了“{word}”。', 'وُه يِين واي تا دِه جيا جِه شوان زِه لِه «{word}».', 'اخترت {meaning} بسبب قيمته.'],
      ['我们到达时，“{word}”就准备好了。', 'وُو مِن داو دا شي، «{word}» جيو جون بي هَاو لِه.', 'عندما نصل، سيكون {meaning} جاهزًا.'],
      ['你能解释“{word}”是怎么工作的吗？', 'ني نِن جييه شي «{word}» شي زِن مَه قونغ زوو دِه ما؟', 'هل يمكنك شرح طريقة عمل {meaning}؟'],
    ],
    words: [
      ['书 (shū)', 'الكتاب'], ['课程 (kèchéng)', 'الدرس'], ['学校 (xuéxiào)', 'المدرسة'], ['图书馆 (túshūguǎn)', 'المكتبة'], ['朋友 (péngyou)', 'الصديق'],
      ['家庭 (jiātíng)', 'العائلة'], ['城市 (chéngshì)', 'المدينة'], ['车站 (chēzhàn)', 'المحطة'], ['酒店 (jiǔdiàn)', 'الفندق'], ['餐厅 (cāntīng)', 'المطعم'],
      ['会议 (huìyì)', 'الاجتماع'], ['项目 (xiàngmù)', 'المشروع'], ['电脑 (diànnǎo)', 'الحاسوب'], ['消息 (xiāoxi)', 'الرسالة'], ['问题 (wèntí)', 'السؤال'],
      ['答案 (dá’àn)', 'الإجابة'], ['机会 (jīhuì)', 'الفرصة'], ['计划 (jìhuà)', 'الخطة'], ['旅行 (lǚxíng)', 'الرحلة'], ['预约 (yùyuē)', 'الموعد'],
      ['协议 (xiéyì)', 'الاتفاق'], ['经验 (jīngyàn)', 'التجربة'], ['解决方案 (jiějué fāngàn)', 'الحل'], ['建议 (jiànyì)', 'الاقتراح'], ['成就 (chéngjiù)', 'الإنجاز'],
    ],
  },
  {
    id: 'russian',
    title: 'الروسية',
    language: 'الروسية',
    icon: 'RU',
    color: 'from-blue-300/20 to-red-400/5',
    iconColor: 'text-blue-300',
    level: 'مبتدئ إلى متقدم',
    teacher: 'يوسف محمود',
    phrases: [
      ['Я выучил слово «{word}».', 'يا فيوتشيل سلوفو «{word}».', 'تعلمت كلمة {meaning}.'],
      ['Вы можете сказать «{word}»?', 'في موژِتي سكازات «{word}»؟', 'هل يمكنك نطق كلمة {meaning}؟'],
      ['Как произносится «{word}»?', 'كاك برَيزنوسيتسيا «{word}»؟', 'كيف تنطق كلمة {meaning}؟'],
      ['Я могу запомнить «{word}».', 'يا موغو زابومنيت «{word}».', 'أستطيع تذكّر كلمة {meaning}.'],
      ['Я изучаю «{word}».', 'يا إيزوتشايو «{word}».', 'أنا أتعلم {meaning}.'],
      ['Мне, пожалуйста, «{word}».', 'منييه، پَژالوستا، «{word}».', 'أريد {meaning}، من فضلك.'],
      ['Где находится «{word}»?', 'غدييه ناخوديتسيا «{word}»؟', 'أين {meaning}؟'],
      ['Сколько стоит «{word}»?', 'سكولكا ستويت «{word}»؟', 'بكم {meaning}؟'],
      ['Мне нужно «{word}».', 'منييه نوجنا «{word}».', 'أحتاج إلى {meaning}.'],
      ['Вы можете помочь мне с «{word}»?', 'في موژِتي پاموتش منييه س «{word}»؟', 'هل يمكنك مساعدتي في {meaning}؟'],
      ['Я работаю с «{word}».', 'يا رابوتايو س «{word}».', 'أعمل مع {meaning}.'],
      ['Вчера я ходил в «{word}».', 'فچيرا يا خاديل ف «{word}».', 'ذهبت إلى {meaning} أمس.'],
      ['Завтра я посещу «{word}».', 'زافترَ يا پاسيِشو «{word}».', 'سأزور {meaning} غدًا.'],
      ['Я уже видел «{word}».', 'يا أوجيه فيديل «{word}».', 'لقد رأيت {meaning} بالفعل.'],
      ['Я изучаю «{word}» уже год.', 'يا إيزوتشايو «{word}» أوجيه غود.', 'أدرس {meaning} منذ عام.'],
      ['Если я найду «{word}», я позвоню вам.', 'يِسلي يا نايدو «{word}»، يا بازفانيو فام.', 'إذا وجدت {meaning}، فسأتصل بك.'],
      ['Хотя мне нравится «{word}», мне нужно больше практики.', 'خاتيا منييه نرافِتسيا «{word}»، منييه نوجنا بولشيه پراكتِيكي.', 'مع أنني أحب {meaning}، أحتاج إلى مزيد من التدريب.'],
      ['Я выбрал «{word}» из-за его ценности.', 'يا فيبرال «{word}» إيززا ييفو تسينُستي.', 'اخترت {meaning} بسبب قيمته.'],
      ['Когда мы приедем, «{word}» будет готово.', 'كاغدا مي بريييديم، «{word}» بوديت غاتوفا.', 'عندما نصل، سيكون {meaning} جاهزًا.'],
      ['Не могли бы вы объяснить, как работает «{word}»?', 'ني ماغلي بي في أوبِياسنيت، كاك رابوتايت «{word}»؟', 'هل يمكنك شرح طريقة عمل {meaning}؟'],
    ],
    words: [
      ['книга (kniga)', 'الكتاب'], ['урок (urok)', 'الدرس'], ['школа (shkola)', 'المدرسة'], ['библиотека (biblioteka)', 'المكتبة'], ['друг (drug)', 'الصديق'],
      ['семья (semya)', 'العائلة'], ['город (gorod)', 'المدينة'], ['вокзал (vokzal)', 'المحطة'], ['гостиница (gostinitsa)', 'الفندق'], ['ресторан (restoran)', 'المطعم'],
      ['встреча (vstrecha)', 'الاجتماع'], ['проект (proyekt)', 'المشروع'], ['компьютер (kompyuter)', 'الحاسوب'], ['сообщение (soobshcheniye)', 'الرسالة'], ['вопрос (vopros)', 'السؤال'],
      ['ответ (otvet)', 'الإجابة'],       ['возможность (vozmozhnost)', 'الفرصة'], ['план (plan)', 'الخطة'], ['путешествие (puteshestviye)', 'الرحلة'], ['запись (zapis)', 'الموعد'],
      ['соглашение (soglasheniye)', 'الاتفاق'], ['опыт (opyt)', 'التجربة'], ['решение (resheniye)', 'الحل'], ['предложение (predlozheniye)', 'الاقتراح'], ['достижение (dostizheniye)', 'الإنجاز'],
    ],
  },
  {
    id: 'turkish',
    title: 'التركية',
    language: 'التركية',
    icon: 'TR',
    color: 'from-red-300/20 to-white/5',
    iconColor: 'text-red-300',
    level: 'مبتدئ إلى متقدم',
    teacher: 'ليلى حسن',
    phrases: [
      ['“{word}” kelimesini öğrendim.', '«{word}» كليميسيني أُرنديم.', 'تعلمت كلمة {meaning}.'],
      ['“{word}” diyebilir misiniz?', '«{word}» دييبيلي‌ر ميسينيز؟', 'هل يمكنك نطق كلمة {meaning}؟'],
      ['“{word}” nasıl telaffuz edilir?', '«{word}» ناسِل تيلافّوز إديلي‌ر؟', 'كيف تنطق كلمة {meaning}؟'],
      ['“{word}” kelimesini hatırlayabilirim.', '«{word}» كليميسيني هاتِرلايابيليريم.', 'أستطيع تذكّر كلمة {meaning}.'],
      ['“{word}” öğreniyorum.', '«{word}» أُرينييوروم.', 'أنا أتعلم {meaning}.'],
      ['Lütfen bana “{word}” verin.', 'لوتفن بانا «{word}» فيرين.', 'أريد {meaning}، من فضلك.'],
      ['“{word}” nerede?', '«{word}» نيريدي؟', 'أين {meaning}؟'],
      ['“{word}” ne kadar?', '«{word}» ني كادار؟', 'بكم {meaning}؟'],
      ['“{word}” gerekiyor.', '«{word}» گيريكييور.', 'أحتاج إلى {meaning}.'],
      ['“{word}” konusunda bana yardım edebilir misiniz?', '«{word}» كونوسوندا بانا ياردِم إديبيلي‌ر ميسينيز؟', 'هل يمكنك مساعدتي في {meaning}؟'],
      ['“{word}” ile çalışıyorum.', '«{word}» إيلي تشاليشييوروم.', 'أعمل مع {meaning}.'],
      ['Dün “{word}” gittim.', 'دون «{word}» گيتتيم.', 'ذهبت إلى {meaning} أمس.'],
      ['Yarın “{word}” ziyaret edeceğim.', 'يارِن «{word}» زييارت إديجييم.', 'سأزور {meaning} غدًا.'],
      ['“{word}” daha önce gördüm.', '«{word}» داها أونجي گوردوم.', 'لقد رأيت {meaning} بالفعل.'],
      ['Bir yıldır “{word}” öğreniyorum.', 'بير يِلدر «{word}» أُرينييوروم.', 'أدرس {meaning} منذ عام.'],
      ['“{word}” bulursam sizi ararım.', '«{word}» بولورسام سيزي أرا‌رِم.', 'إذا وجدت {meaning}، فسأتصل بك.'],
      ['“{word}” sevsem de daha fazla pratik yapmalıyım.', '«{word}» سيفسِم دي داها فازلا پراتيك ياپمالِيِم.', 'مع أنني أحب {meaning}، أحتاج إلى مزيد من التدريب.'],
      ['Değeri nedeniyle “{word}” seçtim.', 'دييري نيدينييلي «{word}» سيتشتيِم.', 'اخترت {meaning} بسبب قيمته.'],
      ['Vardığımızda “{word}” hazır olacak.', 'فاردِيمِزدا «{word}» حاضِر أولاجاك.', 'عندما نصل، سيكون {meaning} جاهزًا.'],
      ['“{word}” nasıl çalışıyor, açıklayabilir misiniz?', '«{word}» ناسِل تشاليشييور، أتشِكلايابيلير ميسينيز؟', 'هل يمكنك شرح طريقة عمل {meaning}؟'],
    ],
    words: [
      ['kitap', 'الكتاب'], ['ders', 'الدرس'], ['okul', 'المدرسة'], ['kütüphane', 'المكتبة'], ['arkadaş', 'الصديق'],
      ['aile', 'العائلة'], ['şehir', 'المدينة'], ['istasyon', 'المحطة'], ['otel', 'الفندق'], ['restoran', 'المطعم'],
      ['toplantı', 'الاجتماع'], ['proje', 'المشروع'], ['bilgisayar', 'الحاسوب'], ['mesaj', 'الرسالة'], ['soru', 'السؤال'],
      ['cevap', 'الإجابة'], ['fırsat', 'الفرصة'], ['plan', 'الخطة'], ['seyahat', 'الرحلة'], ['randevu', 'الموعد'],
      ['anlaşma', 'الاتفاق'], ['deneyim', 'التجربة'], ['çözüm', 'الحل'], ['öneri', 'الاقتراح'], ['başarı', 'الإنجاز'],
    ],
  },
]

const courses = [
  { id: 1, title: 'أساسيات JavaScript من الصفر', language: 'JavaScript', category: 'تطوير الويب', level: 'مبتدئ', lessons: 42, hours: '8 ساعات', rating: '4.9', students: '2.4k', color: 'from-amber-300/20 to-amber-500/5', icon: 'JS', iconColor: 'text-amber-300', teacher: 'أحمد سامي', featured: true },
  { id: 2, title: 'ابني واجهات عصرية بـ React', language: 'React', category: 'تطوير الويب', level: 'متوسط', lessons: 36, hours: '11 ساعة', rating: '4.8', students: '1.8k', color: 'from-cyan-300/20 to-blue-500/5', icon: '⚛', iconColor: 'text-cyan-300', teacher: 'مريم خالد' },
  { id: 3, title: 'Python وتحليل البيانات', language: 'Python', category: 'الذكاء الاصطناعي', level: 'مبتدئ', lessons: 51, hours: '14 ساعة', rating: '5.0', students: '3.1k', color: 'from-blue-400/20 to-yellow-400/5', icon: 'Py', iconColor: 'text-blue-300', teacher: 'عمر ناصر', featured: true },
  { id: 4, title: 'تطوير تطبيقات Flutter', language: 'Flutter', category: 'تطبيقات الموبايل', level: 'متوسط', lessons: 28, hours: '9 ساعات', rating: '4.7', students: '980', color: 'from-sky-300/20 to-indigo-500/5', icon: '✦', iconColor: 'text-sky-300', teacher: 'سارة علي' },
  { id: 5, title: 'قواعد البيانات مع SQL', language: 'SQL', category: 'قواعد البيانات', level: 'مبتدئ', lessons: 24, hours: '6 ساعات', rating: '4.9', students: '1.2k', color: 'from-violet-300/20 to-fuchsia-500/5', icon: 'DB', iconColor: 'text-violet-300', teacher: 'كريم عادل' },
  { id: 6, title: 'Java للمطورين الطموحين', language: 'Java', category: 'تطوير الويب', level: 'مبتدئ', lessons: 39, hours: '12 ساعة', rating: '4.8', students: '760', color: 'from-orange-300/20 to-red-500/5', icon: 'Ja', iconColor: 'text-orange-300', teacher: 'يوسف محمود' },
  { id: 7, title: 'TypeScript لتطبيقات أقوى', language: 'TypeScript', category: 'تطوير الويب', level: 'متوسط', lessons: 30, hours: '8 ساعات', rating: '4.9', students: '890', color: 'from-blue-400/20 to-blue-700/5', icon: 'TS', iconColor: 'text-blue-300', teacher: 'ليلى حسن' },
  { id: 8, title: 'برمجة الأنظمة بـ C++', language: 'C++', category: 'تطوير الويب', level: 'متوسط', lessons: 34, hours: '13 ساعة', rating: '4.8', students: '1.1k', color: 'from-indigo-300/20 to-blue-500/5', icon: 'C++', iconColor: 'text-indigo-300', teacher: 'محمود فؤاد' },
  { id: 9, title: 'ابني موقعك الأول بـ HTML', language: 'HTML', category: 'تطوير الويب', level: 'مبتدئ', lessons: 18, hours: '4 ساعات', rating: '4.9', students: '2.8k', color: 'from-orange-300/20 to-red-500/5', icon: '5', iconColor: 'text-orange-300', teacher: 'نورهان عادل' },
  { id: 10, title: 'تصميم الواجهات مع CSS', language: 'CSS', category: 'تطوير الويب', level: 'مبتدئ', lessons: 22, hours: '5 ساعات', rating: '4.8', students: '1.9k', color: 'from-sky-300/20 to-blue-600/5', icon: 'CSS', iconColor: 'text-sky-300', teacher: 'نورهان عادل' },
  { id: 11, title: 'برمجة الويب بـ PHP', language: 'PHP', category: 'تطوير الويب', level: 'مبتدئ', lessons: 32, hours: '9 ساعات', rating: '4.7', students: '640', color: 'from-violet-300/20 to-indigo-500/5', icon: 'PHP', iconColor: 'text-violet-300', teacher: 'حسام فتحي' },
  { id: 12, title: 'حلل بياناتك مع MongoDB', language: 'MongoDB', category: 'قواعد البيانات', level: 'متوسط', lessons: 20, hours: '6 ساعات', rating: '4.8', students: '530', color: 'from-green-300/20 to-emerald-600/5', icon: 'Mg', iconColor: 'text-green-300', teacher: 'كريم عادل' },
  { id: 13, title: 'تطبيقات حديثة بـ Kotlin', language: 'Kotlin', category: 'تطبيقات الموبايل', level: 'متوسط', lessons: 27, hours: '8 ساعات', rating: '4.8', students: '470', color: 'from-fuchsia-300/20 to-violet-500/5', icon: 'Kt', iconColor: 'text-fuchsia-300', teacher: 'سارة علي' },
  { id: 14, title: 'Go للخدمات السريعة', language: 'Go', category: 'تطوير الويب', level: 'متوسط', lessons: 25, hours: '7 ساعات', rating: '4.7', students: '390', color: 'from-cyan-300/20 to-sky-600/5', icon: 'Go', iconColor: 'text-cyan-300', teacher: 'أحمد سامي' },
  { id: 15, title: 'تطوير تطبيقات iOS بـ Swift', language: 'Swift', category: 'تطبيقات الموبايل', level: 'مبتدئ', lessons: 31, hours: '10 ساعات', rating: '4.8', students: '420', color: 'from-orange-300/20 to-red-500/5', icon: 'Sw', iconColor: 'text-orange-300', teacher: 'سارة علي' },
  { id: 16, title: 'برمجة تطبيقات بـ C#', language: 'C#', category: 'تطوير الويب', level: 'مبتدئ', lessons: 33, hours: '10 ساعات', rating: '4.8', students: '610', color: 'from-violet-300/20 to-purple-600/5', icon: 'C#', iconColor: 'text-violet-300', teacher: 'يوسف محمود' },
  { id: 17, title: 'أساسيات لغة Ruby', language: 'Ruby', category: 'تطوير الويب', level: 'مبتدئ', lessons: 26, hours: '7 ساعات', rating: '4.7', students: '320', color: 'from-red-300/20 to-rose-600/5', icon: 'Rb', iconColor: 'text-red-300', teacher: 'ليلى حسن' },
  { id: 18, title: 'PostgreSQL من البداية', language: 'PostgreSQL', category: 'قواعد البيانات', level: 'متوسط', lessons: 23, hours: '7 ساعات', rating: '4.9', students: '490', color: 'from-sky-300/20 to-indigo-600/5', icon: 'Pg', iconColor: 'text-sky-300', teacher: 'كريم عادل' },
  { id: 19, title: 'أساسيات Rust وبرمجة الأنظمة', language: 'Rust', category: 'تطوير الويب', level: 'متوسط', lessons: 188, hours: '18 ساعة', rating: '4.9', students: '350', color: 'from-orange-300/20 to-red-500/5', icon: 'Rs', iconColor: 'text-orange-300', teacher: 'أحمد سامي' },
  { id: 20, title: 'تطوير تطبيقات Dart', language: 'Dart', category: 'تطبيقات الموبايل', level: 'مبتدئ', lessons: 188, hours: '16 ساعة', rating: '4.8', students: '290', color: 'from-sky-300/20 to-blue-500/5', icon: 'Da', iconColor: 'text-sky-300', teacher: 'سارة علي' },
  { id: 21, title: 'تحليل البيانات باستخدام R', language: 'R', category: 'الذكاء الاصطناعي', level: 'مبتدئ', lessons: 188, hours: '15 ساعة', rating: '4.9', students: '410', color: 'from-blue-400/20 to-cyan-500/5', icon: 'R', iconColor: 'text-blue-300', teacher: 'عمر ناصر' },
  { id: 22, title: 'أتمتة المهام باستخدام Bash', language: 'Bash', category: 'تطوير الويب', level: 'مبتدئ', lessons: 188, hours: '12 ساعة', rating: '4.7', students: '270', color: 'from-green-300/20 to-emerald-600/5', icon: '$_', iconColor: 'text-green-300', teacher: 'محمود فؤاد' },
  { id: 23, title: 'البرمجة بلغة Lua', language: 'Lua', category: 'تطوير الويب', level: 'مبتدئ', lessons: 188, hours: '13 ساعة', rating: '4.8', students: '240', color: 'from-indigo-300/20 to-blue-500/5', icon: 'Lu', iconColor: 'text-indigo-300', teacher: 'ليلى حسن' },
  { id: 24, title: 'برمجة Scala وتطبيقاتها', language: 'Scala', category: 'تطوير الويب', level: 'متوسط', lessons: 188, hours: '17 ساعة', rating: '4.8', students: '220', color: 'from-red-300/20 to-rose-600/5', icon: 'Sc', iconColor: 'text-red-300', teacher: 'يوسف محمود' },
  ...worldLanguages.map((language, index) => ({
    id: 31 + index,
    title: `تعلم ${language.title} من الصفر إلى الإتقان`,
    language: language.title,
    category: 'اللغات',
    level: language.level,
    lessons: worldLanguageLessons,
    hours: '50 ساعة',
    rating: '4.9',
    students: `${340 - index * 25}`,
    color: language.color,
    icon: language.icon,
    iconColor: language.iconColor,
    teacher: language.teacher,
    courseType: 'world-language',
    languageId: language.id,
  })),
  { id: 25, title: 'أساسيات لغة C', language: 'C', category: 'تطوير الويب', level: 'مبتدئ', lessons: lessonsPerBook, hours: '16 ساعة', rating: '4.8', students: '310', color: 'from-sky-300/20 to-blue-600/5', icon: 'C', iconColor: 'text-sky-300', teacher: 'محمود فؤاد' },
  { id: 26, title: 'البرمجة الوظيفية مع Elixir', language: 'Elixir', category: 'تطوير الويب', level: 'متوسط', lessons: lessonsPerBook, hours: '15 ساعة', rating: '4.8', students: '190', color: 'from-violet-300/20 to-fuchsia-500/5', icon: 'Ex', iconColor: 'text-violet-300', teacher: 'ليلى حسن' },
  { id: 27, title: 'أساسيات Haskell', language: 'Haskell', category: 'تطوير الويب', level: 'متوسط', lessons: lessonsPerBook, hours: '17 ساعة', rating: '4.9', students: '180', color: 'from-purple-300/20 to-indigo-500/5', icon: 'Hs', iconColor: 'text-purple-300', teacher: 'أحمد سامي' },
  { id: 28, title: 'الحوسبة العلمية مع Julia', language: 'Julia', category: 'الذكاء الاصطناعي', level: 'متوسط', lessons: lessonsPerBook, hours: '14 ساعة', rating: '4.8', students: '230', color: 'from-purple-300/20 to-green-500/5', icon: 'Ju', iconColor: 'text-purple-300', teacher: 'عمر ناصر' },
  { id: 29, title: 'أتمتة المهام باستخدام Perl', language: 'Perl', category: 'تطوير الويب', level: 'متوسط', lessons: lessonsPerBook, hours: '13 ساعة', rating: '4.7', students: '170', color: 'from-blue-300/20 to-cyan-500/5', icon: 'Pl', iconColor: 'text-blue-300', teacher: 'يوسف محمود' },
  { id: 30, title: 'إدارة الأنظمة باستخدام PowerShell', language: 'PowerShell', category: 'تطوير الويب', level: 'مبتدئ', lessons: lessonsPerBook, hours: '12 ساعة', rating: '4.8', students: '260', color: 'from-blue-400/20 to-indigo-500/5', icon: 'PS', iconColor: 'text-blue-300', teacher: 'سارة علي' },
].map((course) => ({ ...course, lessons: course.courseType === 'world-language' ? worldLanguageLessons : lessonsPerBook }))

const topics = [
  { name: 'JavaScript', label: 'جافاسكريبت', symbol: 'JS', color: 'text-amber-300', bg: 'bg-amber-300/10' },
  { name: 'Python', label: 'بايثون', symbol: 'Py', color: 'text-blue-300', bg: 'bg-blue-300/10' },
  { name: 'React', label: 'رياكت', symbol: '⚛', color: 'text-cyan-300', bg: 'bg-cyan-300/10' },
  { name: 'Java', label: 'جافا', symbol: 'Ja', color: 'text-orange-300', bg: 'bg-orange-300/10' },
  { name: 'CSS', label: 'سي إس إس', symbol: 'CSS', color: 'text-sky-300', bg: 'bg-sky-300/10' },
  { name: 'Flutter', label: 'فلاتر', symbol: '✦', color: 'text-sky-300', bg: 'bg-sky-300/10' },
  { name: 'SQL', label: 'قواعد البيانات', symbol: 'DB', color: 'text-violet-300', bg: 'bg-violet-300/10' },
  { name: 'TypeScript', label: 'تايب سكريبت', symbol: 'TS', color: 'text-blue-300', bg: 'bg-blue-300/10' },
  { name: 'C++', label: 'سي بلس بلس', symbol: 'C++', color: 'text-indigo-300', bg: 'bg-indigo-300/10' },
  { name: 'HTML', label: 'إتش تي إم إل', symbol: '5', color: 'text-orange-300', bg: 'bg-orange-300/10' },
  { name: 'PHP', label: 'بي إتش بي', symbol: 'PHP', color: 'text-violet-300', bg: 'bg-violet-300/10' },
  { name: 'MongoDB', label: 'مونجو دي بي', symbol: 'Mg', color: 'text-green-300', bg: 'bg-green-300/10' },
  { name: 'Kotlin', label: 'كوتلن', symbol: 'Kt', color: 'text-fuchsia-300', bg: 'bg-fuchsia-300/10' },
  { name: 'Go', label: 'جو', symbol: 'Go', color: 'text-cyan-300', bg: 'bg-cyan-300/10' },
  { name: 'Swift', label: 'سويفت', symbol: 'Sw', color: 'text-orange-300', bg: 'bg-orange-300/10' },
  { name: 'C#', label: 'سي شارب', symbol: 'C#', color: 'text-violet-300', bg: 'bg-violet-300/10' },
  { name: 'Ruby', label: 'روبي', symbol: 'Rb', color: 'text-red-300', bg: 'bg-red-300/10' },
  { name: 'PostgreSQL', label: 'بوستجريس', symbol: 'Pg', color: 'text-sky-300', bg: 'bg-sky-300/10' },
  { name: 'Rust', label: 'رست', symbol: 'Rs', color: 'text-orange-300', bg: 'bg-orange-300/10' },
  { name: 'Dart', label: 'دارت', symbol: 'Da', color: 'text-sky-300', bg: 'bg-sky-300/10' },
  { name: 'R', label: 'لغة R', symbol: 'R', color: 'text-blue-300', bg: 'bg-blue-300/10' },
  { name: 'Bash', label: 'باش', symbol: '$_', color: 'text-green-300', bg: 'bg-green-300/10' },
  { name: 'Lua', label: 'لوا', symbol: 'Lu', color: 'text-indigo-300', bg: 'bg-indigo-300/10' },
  { name: 'Scala', label: 'سكالا', symbol: 'Sc', color: 'text-red-300', bg: 'bg-red-300/10' },
  { name: 'C', label: 'لغة C', symbol: 'C', color: 'text-sky-300', bg: 'bg-sky-300/10' },
  { name: 'Elixir', label: 'إليكسير', symbol: 'Ex', color: 'text-violet-300', bg: 'bg-violet-300/10' },
  { name: 'Haskell', label: 'هاسكل', symbol: 'Hs', color: 'text-purple-300', bg: 'bg-purple-300/10' },
  { name: 'Julia', label: 'جوليا', symbol: 'Ju', color: 'text-purple-300', bg: 'bg-purple-300/10' },
  { name: 'Perl', label: 'بيرل', symbol: 'Pl', color: 'text-blue-300', bg: 'bg-blue-300/10' },
  { name: 'PowerShell', label: 'باورشيل', symbol: 'PS', color: 'text-blue-300', bg: 'bg-blue-300/10' },
  ...worldLanguages.map((language) => ({
    name: language.title,
    label: language.title,
    symbol: language.icon,
    color: language.iconColor,
    bg: 'bg-white/5',
  })),
]

const lessonTopics = [
  'المتغيرات والقيم', 'تنسيق النصوص', 'العمليات الحسابية', 'المقارنة بين القيم',
  'اتخاذ القرار', 'التكرار على البيانات', 'القوائم والمجموعات', 'تصفية النتائج',
  'تحويل البيانات', 'تمثيل الكائنات', 'كتابة الدوال', 'الوسائط الاختيارية',
  'ترتيب البيانات', 'منع التكرار', 'القواميس والخرائط', 'بناء الأصناف',
  'معالجة الأخطاء', 'تحويل البيانات إلى JSON', 'إيجاد أفضل نتيجة',
]

const lessonExplanations = [
  'المتغير اسم نخزن تحته قيمة لاستخدامها لاحقًا، ويعرض المثال قيمة مرتبطة ببيانات التطبيق.',
  'تنسيق النصوص يدمج الكلمات والقيم داخل رسالة واحدة؛ راقب كيف يظهر اسم العنصر ورقم الدرس.',
  'العمليات الحسابية تنفذ حسابًا على القيم؛ المثال يضرب قيمة البيانات في رقم الدرس.',
  'المقارنة تنتج قيمة منطقية؛ جرّب تغيير الرقم لترى متى يصبح الشرط صحيحًا.',
  'اتخاذ القرار يختار نتيجة مختلفة حسب الشرط، مثل تحديد إن كانت القيمة مناسبة.',
  'التكرار يعالج كل عنصر في مجموعة دون كتابة التعليمة نفسها عدة مرات.',
  'القوائم والمجموعات تحفظ أكثر من قيمة، ويعرض المثال كيفية الوصول إلى عناصرها.',
  'التصفية تنشئ مجموعة جديدة لا تضم إلا القيم التي تحقق الشرط.',
  'تحويل البيانات ينقل القيم إلى شكل آخر مناسب للعرض أو المعالجة.',
  'تمثيل الكائنات يجمع خصائص مترابطة، مثل اسم العنصر ورقم الدرس، تحت بنية واحدة.',
  'الدالة تجمع خطوات قابلة لإعادة الاستخدام، وتعيد نتيجة عند تمرير القيم إليها.',
  'القيمة الاختيارية تسمح باستدعاء الدالة دون تمرير كل الوسائط يدويًا.',
  'الترتيب يعيد تنظيم العناصر تصاعديًا لتسهيل المقارنة بينها.',
  'منع التكرار يحتفظ بنسخة واحدة من كل قيمة فريدة داخل المجموعة.',
  'القاموس أو الخريطة يربط مفتاحًا بقيمة، ما يتيح استرجاع بيانات محددة باسمها.',
  'الصنف يصف بنية كائن جديد ويجمع خصائصه في قالب قابل لإعادة الاستخدام.',
  'معالجة الأخطاء تمنع توقف البرنامج عند تعذر العملية وتسمح بعرض نتيجة بديلة.',
  'JSON صيغة شائعة لتبادل البيانات المنظمة بين البرامج والخدمات.',
  'إيجاد أفضل نتيجة يقارن القيم ويختار الأكبر أو الأنسب من بينها.',
]

const lessonScenarios = [
  { name: 'مكتبة الكتب', table: 'books', field: 'pages', label: 'كتاب البرمجة', value: 180 },
  { name: 'متجر إلكتروني', table: 'products', field: 'price', label: 'لوحة مفاتيح', value: 75 },
  { name: 'تطبيق الدراسة', table: 'lessons', field: 'duration', label: 'درس المتغيرات', value: 25 },
  { name: 'حجوزات السفر', table: 'trips', field: 'days', label: 'رحلة القاهرة', value: 6 },
  { name: 'إدارة المهام', table: 'tasks', field: 'priority', label: 'مراجعة الكود', value: 3 },
  { name: 'مقهى صغير', table: 'orders', field: 'total', label: 'قهوة اليوم', value: 42 },
  { name: 'نادي الرياضة', table: 'members', field: 'visits', label: 'تمرين الصباح', value: 12 },
  { name: 'منصة الأفلام', table: 'movies', field: 'rating', label: 'رحلة فضائية', value: 9 },
  { name: 'عيادة الأسرة', table: 'appointments', field: 'hour', label: 'موعد المراجعة', value: 11 },
  { name: 'تطبيق الطقس', table: 'forecasts', field: 'temperature', label: 'توقعات اليوم', value: 28 },
]

function createAdditionalLanguageCode(language, topicIndex, scenario, lessonNumber) {
  const suffix = String(lessonNumber).padStart(3, '0')
  const variable = `sample${suffix}`
  const title = scenario.label
  const value = scenario.value + lessonNumber
  const className = `Lesson${suffix}`

  if (language === 'Rust') {
    const examples = [
      `let ${variable}: i32 = ${value};\nprintln!("${title}: {}", ${variable});`,
      `let label${suffix} = "${title}";\nprintln!("درس {}: {}", ${lessonNumber}, label${suffix});`,
      `let total${suffix} = ${scenario.value} * ${lessonNumber};\nprintln!("{}", total${suffix});`,
      `let ready${suffix} = ${value} >= ${scenario.value};\nprintln!("{}", if ready${suffix} { "جاهز" } else { "قيد التعلم" });`,
      `let score${suffix} = ${value};\nif score${suffix} >= ${scenario.value} {\n    println!("${title}: مكتمل");\n} else {\n    println!("قيد التعلم");\n}`,
      `let items${suffix} = vec!["${title}", "مثال ${lessonNumber}"];\nfor item in &items${suffix} {\n    println!("{}", item);\n}`,
      `let values${suffix} = vec![${scenario.value}, ${value}, ${lessonNumber + 2}];\nprintln!("{:?}", &values${suffix}[1..]);`,
      `let values${suffix} = vec![${scenario.value}, ${value}, ${lessonNumber + 2}];\nlet large${suffix}: Vec<i32> = values${suffix}.into_iter().filter(|item| *item >= ${scenario.value}).collect();\nprintln!("{:?}", large${suffix});`,
      `let mut details${suffix} = std::collections::HashMap::new();\ndetails${suffix}.insert("title", "${title}");\ndetails${suffix}.insert("lesson", "${lessonNumber}");\nprintln!("{:?}", details${suffix});`,
      `fn ${variable}(first: i32, second: i32) -> i32 { first + second }\nprintln!("{}", ${variable}(${scenario.value}, ${lessonNumber}));`,
      `let ${variable} = |step: i32| step + ${lessonNumber};\nprintln!("{}", ${variable}(${scenario.value}));`,
      `let mut values${suffix} = vec![${scenario.value}, ${value}, ${lessonNumber + 2}];\nvalues${suffix}.sort();\nprintln!("{:?}", values${suffix});`,
      `let tags${suffix} = std::collections::HashSet::from(["${title}", "Rust", "lesson-${lessonNumber}"]);\nprintln!("{}", tags${suffix}.len());`,
      `let scores${suffix} = std::collections::HashMap::from([("${title}", ${value}), ("lesson-${lessonNumber}", ${scenario.value})]);\nprintln!("{:?}", scores${suffix});`,
      `struct ${className} { title: &'static str, lesson: u32 }\nlet item${suffix} = ${className} { title: "${title}", lesson: ${lessonNumber} };\nprintln!("{} #{}", item${suffix}.title, item${suffix}.lesson);`,
      `let result${suffix} = ${value}.checked_div(${scenario.value});\nprintln!("{:?}", result${suffix});`,
      `println!(r#"{{"title":"{}","lesson":{}}}"#, "${title}", ${lessonNumber});`,
      `let scores${suffix} = [${scenario.value}, ${value}, ${lessonNumber + 1}];\nlet best${suffix} = scores${suffix}.iter().max().unwrap();\nprintln!("{}", best${suffix});`,
      `let values${suffix} = [${scenario.value}, ${value}, ${lessonNumber + 2}];\nlet scaled${suffix}: Vec<i32> = values${suffix}.iter().map(|item| item * 2).collect();\nprintln!("{:?}", scaled${suffix});`,
    ]
    return examples[topicIndex]
  }

  if (language === 'Dart') {
    const examples = [
      `final ${variable} = ${value};\nprint("$title: $${variable}");`,
      `final label${suffix} = "${title}";\nprint("درس ${lessonNumber}: $label${suffix}");`,
      `final total${suffix} = ${scenario.value} * ${lessonNumber};\nprint(total${suffix});`,
      `final ready${suffix} = ${value} >= ${scenario.value};\nprint(ready${suffix} ? "جاهز" : "قيد التعلم");`,
      `final score${suffix} = ${value};\nif (score${suffix} >= ${scenario.value}) {\n  print("${title}: مكتمل");\n} else {\n  print("قيد التعلم");\n}`,
      `final items${suffix} = <String>["${title}", "مثال ${lessonNumber}"];\nfor (final item in items${suffix}) {\n  print(item);\n}`,
      `final values${suffix} = <int>[${scenario.value}, ${value}, ${lessonNumber + 2}];\nprint(values${suffix}.skip(1).toList());`,
      `final values${suffix} = <int>[${scenario.value}, ${value}, ${lessonNumber + 2}];\nfinal large${suffix} = values${suffix}.where((item) => item >= ${scenario.value}).toList();\nprint(large${suffix});`,
      `final details${suffix} = <String, Object>{"title": "${title}", "lesson": ${lessonNumber}};\nprint(details${suffix}["title"]);`,
      `int ${variable}(int first, int second) => first + second;\nprint(${variable}(${scenario.value}, ${lessonNumber}));`,
      `int ${variable}([int step = ${scenario.value}]) => step + ${lessonNumber};\nprint(${variable}());`,
      `final values${suffix} = <int>[${scenario.value}, ${value}, ${lessonNumber + 2}]..sort();\nprint(values${suffix});`,
      `final tags${suffix} = <String>{"${title}", "Dart", "lesson-${lessonNumber}"};\nprint(tags${suffix}.length);`,
      `final scores${suffix} = <String, int>{"${title}": ${value}, "lesson-${lessonNumber}": ${scenario.value}};\nprint(scores${suffix}["${title}"]);`,
      `class ${className} {\n  final String title;\n  final int lesson;\n  ${className}(this.title, this.lesson);\n}\nfinal item${suffix} = ${className}("${title}", ${lessonNumber});\nprint(item${suffix}.title);`,
      `try {\n  print(${value} ~/ ${scenario.value});\n} on IntegerDivisionByZeroException {\n  print("تعذر الحساب");\n}`,
      `final json${suffix} = '{"title":"${title}","lesson":${lessonNumber}}';\nprint(json${suffix});`,
      `final scores${suffix} = <int>[${scenario.value}, ${value}, ${lessonNumber + 1}];\nprint(scores${suffix}.reduce((a, b) => a > b ? a : b));`,
      `final values${suffix} = <int>[${scenario.value}, ${value}, ${lessonNumber + 2}];\nprint(values${suffix}.map((item) => item * 2).toList());`,
    ]
    return examples[topicIndex]
  }

  if (language === 'R') {
    const examples = [
      `${variable} <- ${value}\ncat("${title}:", ${variable}, "\\n")`,
      `label${suffix} <- "${title}"\ncat(sprintf("درس ${lessonNumber}: %s\\n", label${suffix}))`,
      `total${suffix} <- ${scenario.value} * ${lessonNumber}\nprint(total${suffix})`,
      `ready${suffix} <- ${value} >= ${scenario.value}\nprint(if (ready${suffix}) "جاهز" else "قيد التعلم")`,
      `score${suffix} <- ${value}\nif (score${suffix} >= ${scenario.value}) {\n  print("${title}: مكتمل")\n} else {\n  print("قيد التعلم")\n}`,
      `items${suffix} <- c("${title}", "مثال ${lessonNumber}")\nfor (item in items${suffix}) print(item)`,
      `values${suffix} <- c(${scenario.value}, ${value}, ${lessonNumber + 2})\nprint(values${suffix}[-1])`,
      `values${suffix} <- c(${scenario.value}, ${value}, ${lessonNumber + 2})\nlarge${suffix} <- values${suffix}[values${suffix} >= ${scenario.value}]\nprint(large${suffix})`,
      `details${suffix} <- list(title = "${title}", lesson = ${lessonNumber})\nprint(details${suffix}$title)`,
      `${variable} <- function(first, second) first + second\nprint(${variable}(${scenario.value}, ${lessonNumber}))`,
      `${variable} <- function(step = ${scenario.value}) step + ${lessonNumber}\nprint(${variable}())`,
      `values${suffix} <- c(${scenario.value}, ${value}, ${lessonNumber + 2})\nprint(sort(values${suffix}))`,
      `tags${suffix} <- unique(c("${title}", "R", "lesson-${lessonNumber}"))\nprint(length(tags${suffix}))`,
      `scores${suffix} <- c("${title}" = ${value}, "lesson-${lessonNumber}" = ${scenario.value})\nprint(scores${suffix})`,
      `item${suffix} <- data.frame(title = "${title}", lesson = ${lessonNumber})\nprint(item${suffix}$title)`,
      `result${suffix} <- tryCatch(${value} / ${scenario.value}, error = function(error) NA_real_)\nprint(result${suffix})`,
      `json${suffix} <- sprintf('{"title":"%s","lesson":%d}', "${title}", ${lessonNumber})\ncat(json${suffix}, "\\n")`,
      `scores${suffix} <- c(${scenario.value}, ${value}, ${lessonNumber + 1})\nprint(max(scores${suffix}))`,
      `values${suffix} <- c(${scenario.value}, ${value}, ${lessonNumber + 2})\nprint(lapply(values${suffix}, function(item) item * 2))`,
    ]
    return examples[topicIndex]
  }

  if (language === 'Bash') {
    const examples = [
      `sample${suffix}=${value}\nprintf '%s: %s\\n' '${title}' "$sample${suffix}"`,
      `label${suffix}='${title}'\nprintf 'درس ${lessonNumber}: %s\\n' "$label${suffix}"`,
      `total${suffix}=$(( ${scenario.value} * ${lessonNumber} ))\necho "$total${suffix}"`,
      `if (( ${value} >= ${scenario.value} )); then echo 'جاهز'; else echo 'قيد التعلم'; fi`,
      `score${suffix}=${value}\nif (( score${suffix} >= ${scenario.value} )); then\n  echo '${title}: مكتمل'\nelse\n  echo 'قيد التعلم'\nfi`,
      `items${suffix}=('${title}' 'مثال ${lessonNumber}')\nfor item in "\${items${suffix}[@]}"; do echo "$item"; done`,
      `values${suffix}=(${scenario.value} ${value} ${lessonNumber + 2})\nprintf '%s\\n' "\${values${suffix}[1]}"`,
      `values${suffix}=(${scenario.value} ${value} ${lessonNumber + 2})\nfor item in "\${values${suffix}[@]}"; do (( item >= ${scenario.value} )) && echo "$item"; done`,
      `declare -A details${suffix}=([title]='${title}' [lesson]=${lessonNumber})\necho "\${details${suffix}[title]}"`,
      `${variable}() { echo $(( $1 + $2 )); }\n${variable} ${scenario.value} ${lessonNumber}`,
      `${variable}() { local step=\${1:-${scenario.value}}; echo $(( step + ${lessonNumber} )); }\n${variable}`,
      `values${suffix}=(${scenario.value} ${value} ${lessonNumber + 2})\nprintf '%s\\n' "\${values${suffix}[@]}" | sort -n`,
      `declare -A tags${suffix}=(["${title}"]=1 [Rust]=1 [lesson-${lessonNumber}]=1)\necho "\${#tags${suffix}[@]}"`,
      `declare -A scores${suffix}=(["${title}"]=${value} [lesson-${lessonNumber}]=${scenario.value})\necho "\${scores${suffix}[lesson-${lessonNumber}]}"`,
      `declare -A item${suffix}=([title]='${title}' [lesson]=${lessonNumber})\necho "\${item${suffix}[title]}"`,
      `if (( ${scenario.value} == 0 )); then echo 'تعذر الحساب'; else echo $(( ${value} / ${scenario.value} )); fi`,
      `printf '{"title":"%s","lesson":%s}\\n' '${title}' '${lessonNumber}'`,
      `scores${suffix}=(${scenario.value} ${value} ${lessonNumber + 1})\nbest${suffix}=\${scores${suffix}[0]}\nfor item in "\${scores${suffix}[@]}"; do (( item > best${suffix} )) && best${suffix}=$item; done\necho "$best${suffix}"`,
      `values${suffix}=(${scenario.value} ${value} ${lessonNumber + 2})\nfor item in "\${values${suffix}[@]}"; do echo $(( item * 2 )); done`,
    ]
    return examples[topicIndex]
  }

  if (language === 'Lua') {
    const examples = [
      `local ${variable} = ${value}\nprint("${title}: " .. ${variable})`,
      `local label${suffix} = "${title}"\nprint("درس ${lessonNumber}: " .. label${suffix})`,
      `local total${suffix} = ${scenario.value} * ${lessonNumber}\nprint(total${suffix})`,
      `local ready${suffix} = ${value} >= ${scenario.value}\nprint(ready${suffix} and "جاهز" or "قيد التعلم")`,
      `local score${suffix} = ${value}\nif score${suffix} >= ${scenario.value} then\n  print("${title}: مكتمل")\nelse\n  print("قيد التعلم")\nend`,
      `local items${suffix} = {"${title}", "مثال ${lessonNumber}"}\nfor _, item in ipairs(items${suffix}) do print(item) end`,
      `local values${suffix} = {${scenario.value}, ${value}, ${lessonNumber + 2}}\nprint(values${suffix}[2], values${suffix}[3])`,
      `local values${suffix} = {${scenario.value}, ${value}, ${lessonNumber + 2}}\nfor _, item in ipairs(values${suffix}) do if item >= ${scenario.value} then print(item) end end`,
      `local details${suffix} = {title = "${title}", lesson = ${lessonNumber}}\nprint(details${suffix}.title)`,
      `local function ${variable}(first, second) return first + second end\nprint(${variable}(${scenario.value}, ${lessonNumber}))`,
      `local function ${variable}(step) return (step or ${scenario.value}) + ${lessonNumber} end\nprint(${variable}())`,
      `local values${suffix} = {${scenario.value}, ${value}, ${lessonNumber + 2}}\ntable.sort(values${suffix})\nprint(table.concat(values${suffix}, ", "))`,
      `local tags${suffix} = {["${title}"] = true, Lua = true, ["lesson-${lessonNumber}"] = true}\nlocal count = 0\nfor _ in pairs(tags${suffix}) do count = count + 1 end\nprint(count)`,
      `local scores${suffix} = {["${title}"] = ${value}, ["lesson-${lessonNumber}"] = ${scenario.value}}\nprint(scores${suffix}["${title}"])`,
      `local ${className} = {title = "${title}", lesson = ${lessonNumber}}\nprint(${className}.title)`,
      `local result${suffix}\nif ${scenario.value} ~= 0 then result${suffix} = ${value} / ${scenario.value} else result${suffix} = "تعذر الحساب" end\nprint(result${suffix})`,
      `local json${suffix} = '{"title":"${title}","lesson":${lessonNumber}}'\nprint(json${suffix})`,
      `local scores${suffix} = {${scenario.value}, ${value}, ${lessonNumber + 1}}\nprint(math.max(table.unpack(scores${suffix})))`,
      `local values${suffix} = {${scenario.value}, ${value}, ${lessonNumber + 2}}\nfor index, item in ipairs(values${suffix}) do values${suffix}[index] = item * 2 end\nprint(table.concat(values${suffix}, ", "))`,
    ]
    return examples[topicIndex]
  }

  if (language === 'Scala') {
    const examples = [
      `val ${variable} = ${value}\nprintln(s"${title}: \$${variable}")`,
      `val label${suffix} = "${title}"\nprintln(s"درس ${lessonNumber}: \$label${suffix}")`,
      `val total${suffix} = ${scenario.value} * ${lessonNumber}\nprintln(total${suffix})`,
      `val ready${suffix} = ${value} >= ${scenario.value}\nprintln(if (ready${suffix}) "جاهز" else "قيد التعلم")`,
      `val score${suffix} = ${value}\nif (score${suffix} >= ${scenario.value}) println("${title}: مكتمل") else println("قيد التعلم")`,
      `val items${suffix} = List("${title}", "مثال ${lessonNumber}")\nitems${suffix}.foreach(println)`,
      `val values${suffix} = Vector(${scenario.value}, ${value}, ${lessonNumber + 2})\nprintln(values${suffix}.drop(1))`,
      `val values${suffix} = List(${scenario.value}, ${value}, ${lessonNumber + 2})\nprintln(values${suffix}.filter(_ >= ${scenario.value}))`,
      `val details${suffix} = Map("title" -> "${title}", "lesson" -> "${lessonNumber}")\nprintln(details${suffix}("title"))`,
      `def ${variable}(first: Int, second: Int): Int = first + second\nprintln(${variable}(${scenario.value}, ${lessonNumber}))`,
      `def ${variable}(step: Int = ${scenario.value}): Int = step + ${lessonNumber}\nprintln(${variable}())`,
      `val values${suffix} = List(${scenario.value}, ${value}, ${lessonNumber + 2})\nprintln(values${suffix}.sorted)`,
      `val tags${suffix} = Set("${title}", "Scala", "lesson-${lessonNumber}")\nprintln(tags${suffix}.size)`,
      `val scores${suffix} = Map("${title}" -> ${value}, "lesson-${lessonNumber}" -> ${scenario.value})\nprintln(scores${suffix}("${title}"))`,
      `case class ${className}(title: String, lesson: Int)\nval item${suffix} = ${className}("${title}", ${lessonNumber})\nprintln(item${suffix}.title)`,
      `val result${suffix} = scala.util.Try(${value} / ${scenario.value}).getOrElse(0)\nprintln(result${suffix})`,
      `val json${suffix} = s"""{"title":"${title}","lesson":${lessonNumber}}"""\nprintln(json${suffix})`,
      `val scores${suffix} = List(${scenario.value}, ${value}, ${lessonNumber + 1})\nprintln(scores${suffix}.max)`,
      `val values${suffix} = List(${scenario.value}, ${value}, ${lessonNumber + 2})\nprintln(values${suffix}.map(_ * 2))`,
    ]
    return examples[topicIndex]
  }
}

function createMoreLanguageCode(language, topicIndex, scenario, lessonNumber) {
  const suffix = String(lessonNumber).padStart(3, '0')
  const variable = `sample${suffix}`
  const value = scenario.value + lessonNumber
  const title = scenario.label

  if (language === 'C') {
    const examples = [
      `#include <stdio.h>\nint main(void) { int ${variable} = ${value}; printf("${title}: %d\\n", ${variable}); return 0; }`,
      `#include <stdio.h>\nint main(void) { const char *label${suffix} = "${title}"; puts(label${suffix}); return 0; }`,
      `#include <stdio.h>\nint main(void) { int total${suffix} = ${scenario.value} * ${lessonNumber}; printf("%d\\n", total${suffix}); return 0; }`,
      `#include <stdio.h>\nint main(void) { int ready${suffix} = ${value} >= ${scenario.value}; printf("%s\\n", ready${suffix} ? "جاهز" : "قيد التعلم"); return 0; }`,
      `#include <stdio.h>\nint main(void) { int score${suffix} = ${value}; if (score${suffix} >= ${scenario.value}) puts("مكتمل"); else puts("قيد التعلم"); return 0; }`,
      `#include <stdio.h>\nint main(void) { const char *items[] = {"${title}", "مثال ${lessonNumber}"}; for (int i = 0; i < 2; i++) puts(items[i]); return 0; }`,
      `#include <stdio.h>\nint main(void) { int values[] = {${scenario.value}, ${value}, ${lessonNumber + 2}}; printf("%d\\n", values[1]); return 0; }`,
      `#include <stdio.h>\nint main(void) { int values[] = {${scenario.value}, ${value}, ${lessonNumber + 2}}; for (int i = 0; i < 3; i++) if (values[i] >= ${scenario.value}) printf("%d\\n", values[i]); return 0; }`,
      `#include <stdio.h>\nint main(void) { struct Detail { const char *title; int lesson; }; struct Detail item = {"${title}", ${lessonNumber}}; puts(item.title); return 0; }`,
      `#include <stdio.h>\nint ${variable}(int a, int b) { return a + b; }\nint main(void) { printf("%d\\n", ${variable}(${scenario.value}, ${lessonNumber})); return 0; }`,
      `#include <stdio.h>\nint main(void) { int step = ${scenario.value}; int result = step + ${lessonNumber}; printf("%d\\n", result); return 0; }`,
      `#include <stdio.h>\nint main(void) { int values[] = {${scenario.value}, ${value}, ${lessonNumber + 2}}; for (int i = 0; i < 3; i++) for (int j = i + 1; j < 3; j++) if (values[i] > values[j]) { int t = values[i]; values[i] = values[j]; values[j] = t; } printf("%d %d %d\\n", values[0], values[1], values[2]); return 0; }`,
      `#include <stdio.h>\nint main(void) { const char *tags[] = {"${title}", "C", "lesson-${lessonNumber}"}; printf("%zu\\n", sizeof(tags) / sizeof(tags[0])); return 0; }`,
      `#include <stdio.h>\nint main(void) { struct Score { const char *name; int value; } score = {"${title}", ${value}}; printf("%s: %d\\n", score.name, score.value); return 0; }`,
      `#include <stdio.h>\nstruct Lesson${suffix} { const char *title; int number; };\nint main(void) { struct Lesson${suffix} item = {"${title}", ${lessonNumber}}; puts(item.title); return 0; }`,
      `#include <stdio.h>\nint main(void) { if (${scenario.value} == 0) puts("تعذر الحساب"); else printf("%d\\n", ${value} / ${scenario.value}); return 0; }`,
      `#include <stdio.h>\nint main(void) { printf("{\\"title\\":\\"${title}\\",\\"lesson\\":%d}\\n", ${lessonNumber}); return 0; }`,
      `#include <stdio.h>\nint main(void) { int values[] = {${scenario.value}, ${value}, ${lessonNumber + 1}}; int best = values[0]; for (int i = 1; i < 3; i++) if (values[i] > best) best = values[i]; printf("%d\\n", best); return 0; }`,
      `#include <stdio.h>\nint main(void) { int values[] = {${scenario.value}, ${value}, ${lessonNumber + 2}}; for (int i = 0; i < 3; i++) values[i] *= 2; printf("%d %d %d\\n", values[0], values[1], values[2]); return 0; }`,
    ]
    return examples[topicIndex]
  }

  if (language === 'Elixir') {
    const examples = [
      `value${suffix} = ${value}\nIO.puts("#{value${suffix}} — ${title}")`,
      `label${suffix} = "${title}"\nIO.puts("درس ${lessonNumber}: " <> label${suffix})`,
      `total${suffix} = ${scenario.value} * ${lessonNumber}\nIO.puts(total${suffix})`,
      `ready${suffix} = ${value} >= ${scenario.value}\nIO.puts(if ready${suffix}, do: "جاهز", else: "قيد التعلم")`,
      `if ${value} >= ${scenario.value}, do: IO.puts("${title}: مكتمل"), else: IO.puts("قيد التعلم")`,
      `items${suffix} = ["${title}", "مثال ${lessonNumber}"]\nEnum.each(items${suffix}, &IO.puts/1)`,
      `values${suffix} = [${scenario.value}, ${value}, ${lessonNumber + 2}]\nIO.inspect(Enum.drop(values${suffix}, 1))`,
      `values${suffix} = [${scenario.value}, ${value}, ${lessonNumber + 2}]\nIO.inspect(Enum.filter(values${suffix}, &(&1 >= ${scenario.value})))`,
      `details${suffix} = %{title: "${title}", lesson: ${lessonNumber}}\nIO.puts(details${suffix}.title)`,
      `add${suffix} = fn first, second -> first + second end\nIO.puts(add${suffix}.(${scenario.value}, ${lessonNumber}))`,
      `scale${suffix} = fn step -> step + ${lessonNumber} end\nIO.puts(scale${suffix}.(${scenario.value}))`,
      `values${suffix} = [${scenario.value}, ${value}, ${lessonNumber + 2}]\nIO.inspect(Enum.sort(values${suffix}))`,
      `tags${suffix} = MapSet.new(["${title}", "Elixir", "lesson-${lessonNumber}"])\nIO.puts(MapSet.size(tags${suffix}))`,
      `scores${suffix} = %{"${title}" => ${value}, "lesson-${lessonNumber}" => ${scenario.value}}\nIO.inspect(scores${suffix}["${title}"])`,
      `lesson${suffix} = %{title: "${title}", number: ${lessonNumber}}\nIO.puts(lesson${suffix}.title)`,
      `result${suffix} = if ${scenario.value} == 0, do: :error, else: div(${value}, ${scenario.value})\nIO.inspect(result${suffix})`,
      `record${suffix} = %{title: "${title}", lesson: ${lessonNumber}}\nIO.inspect(record${suffix}, pretty: true)`,
      `scores${suffix} = [${scenario.value}, ${value}, ${lessonNumber + 1}]\nIO.puts(Enum.max(scores${suffix}))`,
      `values${suffix} = [${scenario.value}, ${value}, ${lessonNumber + 2}]\nIO.inspect(Enum.map(values${suffix}, &(&1 * 2)))`,
    ]
    return examples[topicIndex]
  }

  if (language === 'Haskell') {
    const examples = [
      `main = print (${value} :: Int)`,
      `main = putStrLn ("درس ${lessonNumber}: ${title}")`,
      `main = print (${scenario.value} * ${lessonNumber})`,
      `main = print (${value} >= ${scenario.value})`,
      `main = putStrLn (if ${value} >= ${scenario.value} then "مكتمل" else "قيد التعلم")`,
      `main = mapM_ putStrLn ["${title}", "مثال ${lessonNumber}"]`,
      `main = print (drop 1 [${scenario.value}, ${value}, ${lessonNumber + 2}])`,
      `main = print (filter (>= ${scenario.value}) [${scenario.value}, ${value}, ${lessonNumber + 2}])`,
      `main = print ("${title}", ${lessonNumber})`,
      `add${suffix} :: Int -> Int -> Int\nadd${suffix} first second = first + second\nmain = print (add${suffix} ${scenario.value} ${lessonNumber})`,
      `scale${suffix} step = step + ${lessonNumber}\nmain = print (scale${suffix} ${scenario.value})`,
      `main = print (quickSort${suffix} [${scenario.value}, ${value}, ${lessonNumber + 2}])\nquickSort${suffix} [] = []\nquickSort${suffix} (x:xs) = quickSort${suffix} [a | a <- xs, a <= x] ++ [x] ++ quickSort${suffix} [a | a <- xs, a > x]`,
      `main = print (length (nub${suffix} ["${title}", "Haskell", "lesson-${lessonNumber}"]))\nnub${suffix} [] = []\nnub${suffix} (x:xs) = x : nub${suffix} (filter (/= x) xs)`,
      `main = print (zip ["${title}", "lesson-${lessonNumber}"] [${value}, ${scenario.value}])`,
      `data Lesson${suffix} = Lesson${suffix} String Int deriving Show\nmain = print (Lesson${suffix} "${title}" ${lessonNumber})`,
      `main = print (safeDivide${suffix} ${value} ${scenario.value})\nsafeDivide${suffix} _ 0 = Nothing\nsafeDivide${suffix} a b = Just (a \`div\` b)`,
      `main = putStrLn "{\\"title\\":\\"${title}\\",\\"lesson\\":${lessonNumber}}"`,
      `main = print (maximum [${scenario.value}, ${value}, ${lessonNumber + 1}])`,
      `main = print (map (* 2) [${scenario.value}, ${value}, ${lessonNumber + 2}])`,
    ]
    return examples[topicIndex]
  }

  if (language === 'Julia') {
    const examples = [
      `${variable} = ${value}\nprintln("${title}: ", ${variable})`,
      `label${suffix} = "${title}"\nprintln("درس ${lessonNumber}: ", label${suffix})`,
      `total${suffix} = ${scenario.value} * ${lessonNumber}\nprintln(total${suffix})`,
      `ready${suffix} = ${value} >= ${scenario.value}\nprintln(ready${suffix} ? "جاهز" : "قيد التعلم")`,
      `if ${value} >= ${scenario.value}\n    println("${title}: مكتمل")\nelse\n    println("قيد التعلم")\nend`,
      `items${suffix} = ["${title}", "مثال ${lessonNumber}"]\nforeach(println, items${suffix})`,
      `values${suffix} = [${scenario.value}, ${value}, ${lessonNumber + 2}]\nprintln(values${suffix}[2:end])`,
      `values${suffix} = [${scenario.value}, ${value}, ${lessonNumber + 2}]\nprintln(filter(x -> x >= ${scenario.value}, values${suffix}))`,
      `details${suffix} = (title = "${title}", lesson = ${lessonNumber})\nprintln(details${suffix}.title)`,
      `add${suffix}(first, second) = first + second\nprintln(add${suffix}(${scenario.value}, ${lessonNumber}))`,
      `scale${suffix}(step = ${scenario.value}) = step + ${lessonNumber}\nprintln(scale${suffix}())`,
      `values${suffix} = sort([${scenario.value}, ${value}, ${lessonNumber + 2}])\nprintln(values${suffix})`,
      `tags${suffix} = Set(["${title}", "Julia", "lesson-${lessonNumber}"])\nprintln(length(tags${suffix}))`,
      `scores${suffix} = Dict("${title}" => ${value}, "lesson-${lessonNumber}" => ${scenario.value})\nprintln(scores${suffix}["${title}"])`,
      `struct Lesson${suffix}\n    title::String\n    number::Int\nend\nitem${suffix} = Lesson${suffix}("${title}", ${lessonNumber})\nprintln(item${suffix}.title)`,
      `result${suffix} = ${scenario.value} == 0 ? nothing : div(${value}, ${scenario.value})\nprintln(result${suffix})`,
      `using JSON3\nrecord${suffix} = (title = "${title}", lesson = ${lessonNumber})\nprintln(JSON3.write(record${suffix}))`,
      `scores${suffix} = [${scenario.value}, ${value}, ${lessonNumber + 1}]\nprintln(maximum(scores${suffix}))`,
      `values${suffix} = [${scenario.value}, ${value}, ${lessonNumber + 2}]\nprintln(values${suffix} .* 2)`,
    ]
    return examples[topicIndex]
  }

  if (language === 'Perl') {
    const examples = [
      `use strict; use warnings;\nmy $${variable} = ${value};\nprint "${title}: $${variable}\\n";`,
      `use strict; use warnings;\nmy $label${suffix} = "${title}";\nprint "درس ${lessonNumber}: $label${suffix}\\n";`,
      `use strict; use warnings;\nmy $total${suffix} = ${scenario.value} * ${lessonNumber};\nprint "$total${suffix}\\n";`,
      `use strict; use warnings;\nmy $ready${suffix} = ${value} >= ${scenario.value};\nprint $ready${suffix} ? "جاهز\\n" : "قيد التعلم\\n";`,
      `use strict; use warnings;\nif (${value} >= ${scenario.value}) { print "${title}: مكتمل\\n"; } else { print "قيد التعلم\\n"; }`,
      `use strict; use warnings;\nmy @items${suffix} = ("${title}", "مثال ${lessonNumber}");\nprint "$_\\n" for @items${suffix};`,
      `use strict; use warnings;\nmy @values${suffix} = (${scenario.value}, ${value}, ${lessonNumber + 2});\nprint "$values${suffix}[1]\\n";`,
      `use strict; use warnings;\nmy @values${suffix} = (${scenario.value}, ${value}, ${lessonNumber + 2});\nmy @large${suffix} = grep { $_ >= ${scenario.value} } @values${suffix};\nprint "@large${suffix}\\n";`,
      `use strict; use warnings;\nmy %details${suffix} = (title => "${title}", lesson => ${lessonNumber});\nprint "$details${suffix}{title}\\n";`,
      `use strict; use warnings;\nsub add${suffix} { return $_[0] + $_[1]; }\nprint add${suffix}(${scenario.value}, ${lessonNumber}), "\\n";`,
      `use strict; use warnings;\nmy $scale${suffix} = sub { ($_[0] // ${scenario.value}) + ${lessonNumber} };\nprint $scale${suffix}->(), "\\n";`,
      `use strict; use warnings;\nmy @values${suffix} = sort { $a <=> $b } (${scenario.value}, ${value}, ${lessonNumber + 2});\nprint "@values${suffix}\\n";`,
      `use strict; use warnings;\nmy %tags${suffix} = map { $_ => 1 } ("${title}", "Perl", "lesson-${lessonNumber}");\nprint scalar keys %tags${suffix}, "\\n";`,
      `use strict; use warnings;\nmy %scores${suffix} = ("${title}" => ${value}, "lesson-${lessonNumber}" => ${scenario.value});\nprint "$scores${suffix}{'${title}'}\\n";`,
      `use strict; use warnings;\nmy $item${suffix} = { title => "${title}", lesson => ${lessonNumber} };\nprint "$item${suffix}->{title}\\n";`,
      `use strict; use warnings;\nmy $result${suffix} = ${scenario.value} ? ${value} / ${scenario.value} : "تعذر الحساب";\nprint "$result${suffix}\\n";`,
      `use strict; use warnings;\nmy $json${suffix} = qq({"title":"${title}","lesson":${lessonNumber}});\nprint "$json${suffix}\\n";`,
      `use strict; use warnings;\nmy @scores${suffix} = (${scenario.value}, ${value}, ${lessonNumber + 1});\nmy $best${suffix} = (sort { $b <=> $a } @scores${suffix})[0];\nprint "$best${suffix}\\n";`,
      `use strict; use warnings;\nmy @values${suffix} = (${scenario.value}, ${value}, ${lessonNumber + 2});\nmy @scaled${suffix} = map { $_ * 2 } @values${suffix};\nprint "@scaled${suffix}\\n";`,
    ]
    return examples[topicIndex]
  }

  if (language === 'PowerShell') {
    const examples = [
      `$${variable} = ${value}\nWrite-Output "${title}: $${variable}"`,
      `$label${suffix} = "${title}"\nWrite-Output "درس ${lessonNumber}: $label${suffix}"`,
      `$total${suffix} = ${scenario.value} * ${lessonNumber}\nWrite-Output $total${suffix}`,
      `$ready${suffix} = ${value} -ge ${scenario.value}\nWrite-Output $ready${suffix}`,
      `if (${value} -ge ${scenario.value}) { Write-Output "${title}: مكتمل" } else { Write-Output "قيد التعلم" }`,
      `$items${suffix} = @("${title}", "مثال ${lessonNumber}")\nforeach ($item in $items${suffix}) { Write-Output $item }`,
      `$values${suffix} = @(${scenario.value}, ${value}, ${lessonNumber + 2})\nWrite-Output $values${suffix}[1]`,
      `$values${suffix} = @(${scenario.value}, ${value}, ${lessonNumber + 2})\n$values${suffix} | Where-Object { $_ -ge ${scenario.value} }`,
      `$details${suffix} = [PSCustomObject]@{ Title = "${title}"; Lesson = ${lessonNumber} }\nWrite-Output $details${suffix}.Title`,
      `function Add${suffix}($first, $second) { return $first + $second }\nAdd${suffix} ${scenario.value} ${lessonNumber}`,
      `function Scale${suffix}($step = ${scenario.value}) { return $step + ${lessonNumber} }\nScale${suffix}`,
      `$values${suffix} = @(${scenario.value}, ${value}, ${lessonNumber + 2}) | Sort-Object\nWrite-Output $values${suffix}`,
      `$tags${suffix} = [System.Collections.Generic.HashSet[string]]::new()\n[void]$tags${suffix}.Add("${title}")\n[void]$tags${suffix}.Add("lesson-${lessonNumber}")\n$tags${suffix}.Count`,
      `$scores${suffix} = @{ "${title}" = ${value}; "lesson-${lessonNumber}" = ${scenario.value} }\n$scores${suffix}["${title}"]`,
      `class Lesson${suffix} { [string]$Title = "${title}"; [int]$Number = ${lessonNumber} }\n$item${suffix} = [Lesson${suffix}]::new()\n$item${suffix}.Title`,
      `try { ${value} / ${scenario.value} } catch { "تعذر الحساب" }`,
      `$record${suffix} = @{ title = "${title}"; lesson = ${lessonNumber} }\n$record${suffix} | ConvertTo-Json`,
      `$scores${suffix} = @(${scenario.value}, ${value}, ${lessonNumber + 1})\n($scores${suffix} | Measure-Object -Maximum).Maximum`,
      `$values${suffix} = @(${scenario.value}, ${value}, ${lessonNumber + 2})\n$values${suffix} | ForEach-Object { $_ * 2 }`,
    ]
    return examples[topicIndex]
  }
}

function createLessonCode(language, topicIndex, scenario, lessonNumber) {
  if (['Rust', 'Dart', 'R', 'Bash', 'Lua', 'Scala'].includes(language)) {
    return createAdditionalLanguageCode(language, topicIndex, scenario, lessonNumber)
  }
  if (['C', 'Elixir', 'Haskell', 'Julia', 'Perl', 'PowerShell'].includes(language)) {
    return createMoreLanguageCode(language, topicIndex, scenario, lessonNumber)
  }

  const suffix = `${String(lessonNumber).padStart(3, '0')}`
  const value = scenario.value + lessonNumber
  const title = scenario.label
  const variable = `sample${suffix}`
  const className = `${variable.charAt(0).toUpperCase()}${variable.slice(1)}`

  if (language === 'SQL' || language === 'PostgreSQL') {
    const statements = [
      `SELECT ${scenario.field}, '${title}' AS lesson\nFROM ${scenario.table}\nWHERE id = ${lessonNumber};`,
      `SELECT '${title}' || ' #' || ${lessonNumber} AS display_name;`,
      `SELECT ${scenario.field}, ${scenario.field} * ${lessonNumber} AS adjusted_value\nFROM ${scenario.table};`,
      `SELECT ${scenario.field}\nFROM ${scenario.table}\nWHERE ${scenario.field} >= ${value}\nORDER BY ${scenario.field} DESC;`,
      `SELECT CASE WHEN ${scenario.field} >= ${value} THEN 'مناسب' ELSE 'يحتاج مراجعة' END AS status\nFROM ${scenario.table};`,
      `SELECT id, ${scenario.field}\nFROM ${scenario.table}\nWHERE id BETWEEN ${lessonNumber} AND ${lessonNumber + 5};`,
      `SELECT ${scenario.field}, COUNT(*) AS item_count\nFROM ${scenario.table}\nGROUP BY ${scenario.field};`,
      `SELECT DISTINCT ${scenario.field}\nFROM ${scenario.table}\nWHERE ${scenario.field} IS NOT NULL;`,
      `SELECT ${scenario.field}, ROUND(AVG(${scenario.field}) OVER (), 2) AS average_value\nFROM ${scenario.table};`,
      `WITH selected_items AS (\n  SELECT id, ${scenario.field}\n  FROM ${scenario.table}\n  WHERE ${scenario.field} > ${scenario.value}\n)\nSELECT * FROM selected_items;`,
      `INSERT INTO ${scenario.table} (id, ${scenario.field})\nVALUES (${lessonNumber}, ${value});`,
      `UPDATE ${scenario.table}\nSET ${scenario.field} = ${value}\nWHERE id = ${lessonNumber};`,
      `SELECT ${scenario.field}\nFROM ${scenario.table}\nWHERE LOWER(CAST(${scenario.field} AS TEXT)) LIKE '%${lessonNumber}%';`,
      `SELECT ${scenario.field}\nFROM ${scenario.table}\nORDER BY ${scenario.field} ASC\nLIMIT ${lessonNumber};`,
      `SELECT ${scenario.field}, COALESCE(${scenario.field}, 0) AS safe_value\nFROM ${scenario.table};`,
      `SELECT a.id, a.${scenario.field}\nFROM ${scenario.table} AS a\nJOIN ${scenario.table} AS b ON b.id = a.id + ${lessonNumber};`,
      `SELECT ${scenario.field}, SUM(${scenario.field}) OVER (ORDER BY id) AS running_total\nFROM ${scenario.table};`,
      `SELECT ${scenario.field}\nFROM ${scenario.table}\nWHERE ${scenario.field} > (SELECT AVG(${scenario.field}) FROM ${scenario.table});`,
      `SELECT id, GREATEST(${scenario.field}, ${value}) AS best_value\nFROM ${scenario.table};`,
    ]
    return statements[topicIndex]
  }

  if (language === 'MongoDB') {
    const operations = [
      `db.${scenario.table}.insertOne({\n  label: "${title}",\n  ${scenario.field}: ${value},\n  lesson: ${lessonNumber}\n})`,
      `db.${scenario.table}.find(\n  { label: "${title}" },\n  { label: 1, ${scenario.field}: 1, _id: 0 }\n)`,
      `db.${scenario.table}.updateOne(\n  { lesson: ${lessonNumber} },\n  { $inc: { ${scenario.field}: ${scenario.value} } }\n)`,
      `db.${scenario.table}.find({\n  ${scenario.field}: { $gte: ${value} }\n}).sort({ ${scenario.field}: -1 })`,
      `db.${scenario.table}.aggregate([\n  { $match: { ${scenario.field}: { $gt: ${scenario.value} } } },\n  { $project: { label: 1, ${scenario.field}: 1 } }\n])`,
      `db.${scenario.table}.deleteMany({\n  lesson: { $lt: ${lessonNumber} }\n})`,
      `db.${scenario.table}.distinct("${scenario.field}", {\n  lesson: ${lessonNumber}\n})`,
      `db.${scenario.table}.find({\n  label: { $regex: "${title}", $options: "i" }\n})`,
      `db.${scenario.table}.aggregate([\n  { $group: { _id: "$${scenario.field}", count: { $sum: 1 } } }\n])`,
      `db.${scenario.table}.findOneAndUpdate(\n  { lesson: ${lessonNumber} },\n  { $set: { reviewed: true, score: ${value} } },\n  { returnDocument: "after" }\n)`,
      `db.${scenario.table}.countDocuments({\n  ${scenario.field}: { $exists: true }\n})`,
      `db.${scenario.table}.find({\n  $or: [{ ${scenario.field}: ${scenario.value} }, { lesson: ${lessonNumber} }]\n})`,
      `db.${scenario.table}.aggregate([\n  { $sort: { ${scenario.field}: 1 } },\n  { $limit: ${lessonNumber} }\n])`,
      `db.${scenario.table}.updateMany(\n  { reviewed: { $ne: true } },\n  { $set: { reviewed: true } }\n)`,
      `db.${scenario.table}.find({\n  ${scenario.field}: { $in: [${scenario.value}, ${value}] }\n})`,
      `db.${scenario.table}.aggregate([\n  { $unwind: "$tags" },\n  { $group: { _id: "$tags", total: { $sum: 1 } } }\n])`,
      `db.${scenario.table}.aggregate([\n  { $set: { adjusted: { $multiply: ["$${scenario.field}", ${lessonNumber}] } } }\n])`,
      `db.${scenario.table}.find({\n  createdAt: { $gte: ISODate("2026-01-01") }\n}).limit(${lessonNumber})`,
      `db.${scenario.table}.aggregate([\n  { $group: { _id: null, best: { $max: "$${scenario.field}" } } }\n])`,
    ]
    return operations[topicIndex]
  }

  if (language === 'HTML') {
    const elements = [
      `<article class="card-${suffix}">\n  <h2>${title}</h2>\n  <p>عدد الصفحات: ${value}</p>\n</article>`,
      `<label for="field-${suffix}">${title}</label>\n<input id="field-${suffix}" name="${scenario.field}" value="${value}" required>`,
      `<ol aria-label="${title}">\n  <li>الخطوة الأولى</li>\n  <li>الخطوة رقم ${lessonNumber}</li>\n</ol>`,
      `<details open>\n  <summary>${title}</summary>\n  <p>قيمة العنصر ${value}</p>\n</details>`,
      `<button type="button" aria-pressed="false" data-lesson="${lessonNumber}">\n  ابدأ ${title}\n</button>`,
      `<progress value="${scenario.value}" max="${value}">${scenario.value}%</progress>`,
      `<time datetime="2026-10-${String((lessonNumber % 28) + 1).padStart(2, '0')}">${title}</time>`,
      `<figure>\n  <img src="cover-${suffix}.jpg" alt="غلاف ${title}">\n  <figcaption>${title}</figcaption>\n</figure>`,
      `<table>\n  <caption>${title}</caption>\n  <tr><th>الخاصية</th><th>القيمة</th></tr>\n  <tr><td>${scenario.field}</td><td>${value}</td></tr>\n</table>`,
      `<form action="/${scenario.table}" method="post">\n  <input type="hidden" name="lesson" value="${lessonNumber}">\n  <button type="submit">حفظ ${title}</button>\n</form>`,
      `<nav aria-label="${title}">\n  <a href="#lesson-${lessonNumber}">اذهب إلى الدرس ${lessonNumber}</a>\n</nav>`,
      `<section id="lesson-${lessonNumber}" aria-labelledby="title-${suffix}">\n  <h2 id="title-${suffix}">${title}</h2>\n</section>`,
      `<select name="${scenario.field}" aria-label="${title}">\n  <option value="${value}">${title}</option>\n  <option value="${scenario.value}">اختيار بديل</option>\n</select>`,
      `<meter min="0" max="${value}" value="${scenario.value}">${scenario.value} من ${value}</meter>`,
      `<blockquote cite="/${scenario.table}/${lessonNumber}">\n  <p>${title} - مثال ${lessonNumber}</p>\n</blockquote>`,
      `<address>\n  تواصل معنا بخصوص ${title}<br>\n  <a href="mailto:hello@example.com">hello@example.com</a>\n</address>`,
      `<output for="input-${suffix}" id="output-${suffix}">${value}</output>`,
      `<ul>\n  <li>${title}</li>\n  <li>القيمة: ${value}</li>\n</ul>`,
      `<header data-topic="${scenario.field}">\n  <h1>${title}</h1>\n  <p>مرجع المثال ${lessonNumber}</p>\n</header>`,
    ]
    return elements[topicIndex]
  }

  if (language === 'CSS') {
    const rules = [
      `.card-${suffix} {\n  color: #d3f36b;\n  padding: ${value}px;\n  border-radius: 12px;\n}`,
      `.title-${suffix} {\n  font-size: ${value}px;\n  line-height: 1.5;\n  letter-spacing: 0.02em;\n}`,
      `.layout-${suffix} {\n  display: grid;\n  grid-template-columns: repeat(${(lessonNumber % 4) + 1}, minmax(0, 1fr));\n  gap: ${scenario.value}px;\n}`,
      `.button-${suffix}:hover {\n  transform: translateY(-${lessonNumber % 9 + 1}px);\n  background: hsl(${lessonNumber * 17 % 360} 60% 45%);\n}`,
      `.panel-${suffix} {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  min-height: ${value}px;\n}`,
      `@media (max-width: ${value + 300}px) {\n  .layout-${suffix} { grid-template-columns: 1fr; }\n}`,
      `.badge-${suffix} {\n  position: relative;\n  inset-inline-start: ${scenario.value}px;\n  z-index: ${lessonNumber};\n}`,
      `.image-${suffix} {\n  width: min(100%, ${value}px);\n  aspect-ratio: ${(lessonNumber % 4) + 1} / 1;\n  object-fit: cover;\n}`,
      `.list-${suffix} > :nth-child(${(lessonNumber % 5) + 1}) {\n  background: #20211d;\n  border-inline-start: 3px solid #d3f36b;\n}`,
      `.field-${suffix}:focus-visible {\n  outline: 2px solid #d3f36b;\n  outline-offset: ${lessonNumber % 6 + 1}px;\n}`,
      `.card-${suffix} {\n  background: linear-gradient(${lessonNumber * 13 % 360}deg, #181817, #252720);\n  box-shadow: 0 ${scenario.value}px ${value}px #0004;\n}`,
      `.container-${suffix} {\n  width: min(100% - ${scenario.value}px, ${value * 10}px);\n  margin-inline: auto;\n}`,
      `.grid-${suffix} {\n  grid-template-areas: "title title" "cover details";\n  grid-template-columns: ${lessonNumber % 2 ? '1fr 2fr' : '2fr 1fr'};\n}`,
      `.text-${suffix} {\n  max-width: ${value}ch;\n  overflow-wrap: anywhere;\n  text-wrap: pretty;\n}`,
      `.stack-${suffix} > * + * {\n  margin-block-start: ${scenario.value}px;\n}`,
      `.tooltip-${suffix}::after {\n  content: "${title}";\n  position: absolute;\n  inset-block-end: calc(100% + ${lessonNumber % 8 + 1}px);\n}`,
      `.progress-${suffix} {\n  background: linear-gradient(to right, #d3f36b ${scenario.value}%, #30312b ${scenario.value}%);\n  height: ${lessonNumber % 8 + 2}px;\n}`,
      `.card-${suffix} {\n  transition: transform ${lessonNumber % 5 + 1}00ms ease;\n  &:hover { transform: scale(1.0${lessonNumber % 9 + 1}); }\n}`,
      `.theme-${suffix} {\n  --accent-${suffix}: hsl(${lessonNumber * 19 % 360} 70% 55%);\n  color: var(--accent-${suffix});\n}`,
    ]
    return rules[topicIndex]
  }

  if (language === 'React') {
    const components = [
      `function ${variable}() {\n  const [value, setValue] = useState(${scenario.value});\n  return (\n    <button onClick={() => setValue(value + 1)}>\n      ${title}: {value}\n    </button>\n  );\n}`,
      `function ${variable}({ title = "${title}" }) {\n  return <h2 className="lesson-${suffix}">{title}</h2>;\n}`,
      `const ${variable} = ${scenario.value} + ${lessonNumber};\nexport default function Lesson${suffix}() {\n  return <output>{${variable}}</output>;\n}`,
      `function ${variable}({ score = ${value} }) {\n  const status = score >= ${scenario.value} ? "مكتمل" : "قيد التعلم";\n  return <p>{status}</p>;\n}`,
      `function ${variable}() {\n  const [open, setOpen] = useState(${lessonNumber % 2 === 0});\n  return <button onClick={() => setOpen(!open)}>{open ? "إغلاق" : "فتح"} ${title}</button>;\n}`,
      `const ${variable} = ["${title}", "مثال ${lessonNumber}", "تطبيق"];\nfunction Lesson${suffix}() {\n  return <ul>{${variable}.map((item) => <li key={item}>{item}</li>)}</ul>;\n}`,
      `function ${variable}({ items = ["${title}", "مثال ${lessonNumber}"] }) {\n  return <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>;\n}`,
      `function ${variable}({ items }) {\n  const visible = items.filter((item) => item.length >= ${scenario.value});\n  return <p>{visible.length} نتائج عن ${title}</p>;\n}`,
      `function ${variable}() {\n  const details = { title: "${title}", lesson: ${lessonNumber} };\n  return <article>{details.title} — {details.lesson}</article>;\n}`,
      `function ${variable}() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount((current) => current + ${scenario.value})}>{count}</button>;\n}`,
      `function ${variable}({ initial = ${value} }) {\n  const [count, setCount] = useState(initial);\n  return <button onClick={() => setCount(count + 1)}>{count}</button>;\n}`,
      `function ${variable}({ values = [${scenario.value}, ${value}, ${lessonNumber + 2}] }) {\n  return <p>{[...values].sort((a, b) => a - b).join(", ")}</p>;\n}`,
      `function ${variable}({ tags = ["${title}", "React"] }) {\n  const uniqueTags = [...new Set(tags)];\n  return <p>{uniqueTags.join(" · ")}</p>;\n}`,
      `function ${variable}() {\n  const lesson = new Map([["title", "${title}"], ["number", ${lessonNumber}]]);\n  return <p>{lesson.get("title")} #{lesson.get("number")}</p>;\n}`,
      `function ${variable}() {\n  const [form, setForm] = useState({ title: "${title}", score: ${value} });\n  return <input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />;\n}`,
      `function ${variable}() {\n  const [query, setQuery] = useState("");\n  return <label>${title}<input value={query} onChange={(event) => setQuery(event.target.value)} /></label>;\n}`,
      `function ${variable}({ score = ${value} }) {\n  try { return <p>{(score / ${scenario.value}).toFixed(2)}</p>; }\n  catch { return <p role="alert">تعذر الحساب</p>; }\n}`,
      `function ${variable}() {\n  const lesson = { title: "${title}", number: ${lessonNumber} };\n  return <pre>{JSON.stringify(lesson, null, 2)}</pre>;\n}`,
      `function ${variable}({ scores = [${scenario.value}, ${value}, ${lessonNumber + 1}] }) {\n  const best = Math.max(...scores);\n  return <strong>أفضل نتيجة: {best}</strong>;\n}`,
    ]
    return components[topicIndex]
  }

  if (language === 'Flutter') {
    const widgets = [
      `class ${variable} extends StatelessWidget {\n  const ${variable}({super.key});\n  @override\n  Widget build(BuildContext context) => Text("${title}: ${value}");\n}`,
      `class ${variable} extends StatelessWidget {\n  @override\n  Widget build(BuildContext context) => const Text("${title}");\n}`,
      `final pages${suffix} = ${scenario.value};\nfinal total${suffix} = pages${suffix} * ${lessonNumber};\nprint(total${suffix});`,
      `Widget ${variable}(int score) => Text(\n  score >= ${scenario.value} ? "مكتمل" : "قيد التعلم",\n);`,
      `Widget ${variable}(bool isOpen) => TextButton(\n  onPressed: () {},\n  child: Text(isOpen ? "إغلاق" : "فتح ${title}"),\n);`,
      `final items${suffix} = ["${title}", "مثال ${lessonNumber}"];\nColumn(children: items${suffix}.map((item) => Text(item)).toList());`,
      `final visible${suffix} = items.where((item) => item.length >= ${scenario.value}).toList();\nprint(visible${suffix});`,
      `final details${suffix} = {"title": "${title}", "lesson": ${lessonNumber}};\nText(details${suffix}["title"]!);`,
      `final values${suffix} = [${scenario.value}, ${value}, ${lessonNumber + 2}]..sort();\nprint(values${suffix});`,
      `final tags${suffix} = <String>{"${title}", "Flutter", "درس ${lessonNumber}"};\nprint(tags${suffix}.length);`,
      `int ${variable}(int first, int second) => first + second;\nprint(${variable}(${scenario.value}, ${lessonNumber}));`,
      `int ${variable}({int initial = ${value}}) => initial + 1;\nprint(${variable}());`,
      `final scores${suffix} = [${scenario.value}, ${value}, ${lessonNumber + 1}];\nscores${suffix}.sort((a, b) => b.compareTo(a));`,
      `final unique${suffix} = [...{${scenario.value}, ${value}, ${lessonNumber}}];\nprint(unique${suffix});`,
      `final lesson${suffix} = Lesson(title: "${title}", number: ${lessonNumber});\nText(lesson${suffix}.title);`,
      `final controller${suffix} = TextEditingController(text: "${title}");\nTextField(controller: controller${suffix});`,
      `try {\n  final result = ${value} ~/ ${scenario.value};\n  print(result);\n} on IntegerDivisionByZeroException {\n  print("تعذر الحساب");\n}`,
      `final json${suffix} = jsonEncode({"title": "${title}", "lesson": ${lessonNumber}});\nprint(json${suffix});`,
      `final best${suffix} = [${scenario.value}, ${value}, ${lessonNumber + 1}].reduce((a, b) => a > b ? a : b);\nprint(best${suffix});`,
    ]
    return widgets[topicIndex]
  }

  if (language === 'Python') {
    const examples = [
      `${variable} = {"title": "${title}", "value": ${value}}\nprint(${variable}["title"], ${variable}["value"])`,
      `${variable} = "${title}"\nprint(f"الدرس {lessonNumber}: {${variable}}")`,
      `${variable} = ${scenario.value} * ${lessonNumber}\nprint(${variable})`,
      `${variable} = ${value} >= ${scenario.value}\nprint("مناسب" if ${variable} else "يحتاج مراجعة")`,
      `score${suffix} = ${value}\nif score${suffix} >= ${scenario.value}:\n    print("مكتمل: ${title}")\nelse:\n    print("قيد التعلم")`,
      `items${suffix} = ["${title}", "مثال ${lessonNumber}", "تطبيق"]\nfor item in items${suffix}:\n    print(item)`,
      `values${suffix} = [${scenario.value}, ${value}, ${lessonNumber + 2}]\nprint(values${suffix}[1:])`,
      `values${suffix} = [${scenario.value}, ${value}, ${lessonNumber + 2}]\nlarge${suffix} = [item for item in values${suffix} if item >= ${scenario.value}]\nprint(large${suffix})`,
      `details${suffix} = {"title": "${title}", "lesson": ${lessonNumber}}\nprint(details${suffix}.get("title"))`,
      `def ${variable}(first, second):\n    return first + second\n\nprint(${variable}(${scenario.value}, ${lessonNumber}))`,
      `def ${variable}(step=${scenario.value}):\n    return step + ${lessonNumber}\n\nprint(${variable}())`,
      `values${suffix} = [${scenario.value}, ${value}, ${lessonNumber + 2}]\nprint(sorted(values${suffix}))`,
      `tags${suffix} = {"${title}", "Python", "lesson-${lessonNumber}"}\nprint(len(tags${suffix}))`,
      `scores${suffix} = {"${title}": ${value}, "lesson-${lessonNumber}": ${scenario.value}}\nprint(scores${suffix})`,
      `class ${className}:\n    def __init__(self):\n        self.title = "${title}"\n        self.lesson = ${lessonNumber}\n\nitem = ${className}()\nprint(item.title)`,
      `try:\n    result = ${value} / ${scenario.value}\nexcept ZeroDivisionError:\n    result = 0\nprint(result)`,
      `import json\n${variable} = json.dumps({"title": "${title}", "lesson": ${lessonNumber}})\nprint(${variable})`,
      `numbers${suffix} = [${scenario.value}, ${value}, ${lessonNumber + 1}]\nprint(max(numbers${suffix}))`,
      `def ${variable}(items):\n    return [item for item in items if item >= ${scenario.value}]\n\nprint(${variable}([${scenario.value}, ${value}, ${lessonNumber + 2}]))`,
    ]
    return examples[topicIndex]
  }

  if (language === 'Ruby') {
    const examples = [
      `${variable} = ${value}\nputs "${title}: #{${variable}}"`,
      `${variable} = "${title}"\nputs "#{${variable}} — درس ${lessonNumber}"`,
      `${variable} = ${scenario.value} * ${lessonNumber}\nputs ${variable}`,
      `ready${suffix} = ${value} >= ${scenario.value}\nputs ready${suffix} ? "جاهز" : "قيد التعلم"`,
      `score${suffix} = ${value}\nif score${suffix} >= ${scenario.value}\n  puts "${title}: مكتمل"\nelse\n  puts "قيد التعلم"\nend`,
      `items${suffix} = ["${title}", "مثال ${lessonNumber}"]\nitems${suffix}.each { |item| puts item }`,
      `values${suffix} = [${scenario.value}, ${value}, ${lessonNumber + 2}]\nputs values${suffix}.drop(1)`,
      `values${suffix} = [${scenario.value}, ${value}, ${lessonNumber + 2}]\nputs values${suffix}.select { |item| item >= ${scenario.value} }`,
      `details${suffix} = { title: "${title}", lesson: ${lessonNumber} }\nputs details${suffix}[:title]`,
      `def ${variable}(first, second)\n  first + second\nend\nputs ${variable}(${scenario.value}, ${lessonNumber})`,
      `def ${variable}(step = ${scenario.value})\n  step + ${lessonNumber}\nend\nputs ${variable}`,
      `values${suffix} = [${scenario.value}, ${value}, ${lessonNumber + 2}]\nputs values${suffix}.sort`,
      `tags${suffix} = ["${title}", "Ruby", "lesson-${lessonNumber}"].uniq\nputs tags${suffix}.length`,
      `scores${suffix} = { "${title}" => ${value}, "lesson-${lessonNumber}" => ${scenario.value} }\nputs scores${suffix}["${title}"]`,
      `class ${variable.charAt(0).toUpperCase() + variable.slice(1)}\n  attr_reader :title\n  def initialize\n    @title = "${title}"\n  end\nend\nputs ${variable.charAt(0).toUpperCase() + variable.slice(1)}.new.title`,
      `begin\n  puts ${value}.fdiv(${scenario.value})\nrescue ZeroDivisionError\n  puts "تعذر الحساب"\nend`,
      `require "json"\nrecord${suffix} = { title: "${title}", lesson: ${lessonNumber} }\nputs JSON.generate(record${suffix})`,
      `scores${suffix} = [${scenario.value}, ${value}, ${lessonNumber + 1}]\nputs scores${suffix}.max`,
      `values${suffix} = [${scenario.value}, ${value}, ${lessonNumber + 2}]\nputs values${suffix}.map { |item| item * 2 }`,
    ]
    return examples[topicIndex]
  }

  if (language === 'Swift') {
    const examples = [
      `let ${variable} = ${value}\nprint("${title}: \\(${variable})")`,
      `let label${suffix} = "${title}"\nprint("درس ${lessonNumber}: \\(label${suffix})")`,
      `let total${suffix} = ${scenario.value} * ${lessonNumber}\nprint(total${suffix})`,
      `let ready${suffix} = ${value} >= ${scenario.value}\nprint(ready${suffix} ? "جاهز" : "قيد التعلم")`,
      `let score${suffix} = ${value}\nif score${suffix} >= ${scenario.value} {\n    print("${title}: مكتمل")\n} else {\n    print("قيد التعلم")\n}`,
      `let items${suffix} = ["${title}", "مثال ${lessonNumber}"]\nfor item in items${suffix} {\n    print(item)\n}`,
      `let values${suffix} = [${scenario.value}, ${value}, ${lessonNumber + 2}]\nprint(Array(values${suffix}.dropFirst()))`,
      `let values${suffix} = [${scenario.value}, ${value}, ${lessonNumber + 2}]\nprint(values${suffix}.filter { $0 >= ${scenario.value} })`,
      `let details${suffix} = ["title": "${title}", "lesson": "${lessonNumber}"]\nprint(details${suffix}["title"] ?? "بدون عنوان")`,
      `func ${variable}(first: Int, second: Int) -> Int {\n    first + second\n}\nprint(${variable}(first: ${scenario.value}, second: ${lessonNumber}))`,
      `func ${variable}(step: Int = ${scenario.value}) -> Int {\n    step + ${lessonNumber}\n}\nprint(${variable}())`,
      `let values${suffix} = [${scenario.value}, ${value}, ${lessonNumber + 2}]\nprint(values${suffix}.sorted())`,
      `let tags${suffix}: Set<String> = ["${title}", "Swift", "lesson-${lessonNumber}"]\nprint(tags${suffix}.count)`,
      `let scores${suffix} = ["${title}": ${value}, "lesson-${lessonNumber}": ${scenario.value}]\nprint(scores${suffix}["${title}", default: 0])`,
      `struct ${variable.charAt(0).toUpperCase() + variable.slice(1)} {\n    let title = "${title}"\n    let lesson = ${lessonNumber}\n}\nprint(${variable.charAt(0).toUpperCase() + variable.slice(1)}().title)`,
      `let result${suffix} = ${value} / ${scenario.value}\nprint(result${suffix})`,
      `let record${suffix} = ["title": "${title}", "lesson": "${lessonNumber}"]\nif let data = try? JSONSerialization.data(withJSONObject: record${suffix}) {\n    print(String(data: data, encoding: .utf8)!)\n}`,
      `let scores${suffix} = [${scenario.value}, ${value}, ${lessonNumber + 1}]\nprint(scores${suffix}.max() ?? 0)`,
      `let values${suffix} = [${scenario.value}, ${value}, ${lessonNumber + 2}]\nprint(values${suffix}.map { $0 * 2 })`,
    ]
    return examples[topicIndex]
  }

  if (language === 'Kotlin') {
    const examples = [
      `val ${variable} = ${value}\nprintln("${title}: $${variable}")`,
      `val label${suffix} = "${title}"\nprintln("درس ${lessonNumber}: $label${suffix}")`,
      `val total${suffix} = ${scenario.value} * ${lessonNumber}\nprintln(total${suffix})`,
      `val ready${suffix} = ${value} >= ${scenario.value}\nprintln(if (ready${suffix}) "جاهز" else "قيد التعلم")`,
      `val score${suffix} = ${value}\nif (score${suffix} >= ${scenario.value}) {\n    println("${title}: مكتمل")\n} else {\n    println("قيد التعلم")\n}`,
      `val items${suffix} = listOf("${title}", "مثال ${lessonNumber}")\nitems${suffix}.forEach { println(it) }`,
      `val values${suffix} = listOf(${scenario.value}, ${value}, ${lessonNumber + 2})\nprintln(values${suffix}.drop(1))`,
      `val values${suffix} = listOf(${scenario.value}, ${value}, ${lessonNumber + 2})\nprintln(values${suffix}.filter { it >= ${scenario.value} })`,
      `val details${suffix} = mapOf("title" to "${title}", "lesson" to ${lessonNumber})\nprintln(details${suffix}["title"])`,
      `fun ${variable}(first: Int, second: Int) = first + second\nprintln(${variable}(${scenario.value}, ${lessonNumber}))`,
      `fun ${variable}(step: Int = ${scenario.value}) = step + ${lessonNumber}\nprintln(${variable}())`,
      `val values${suffix} = listOf(${scenario.value}, ${value}, ${lessonNumber + 2})\nprintln(values${suffix}.sorted())`,
      `val tags${suffix} = setOf("${title}", "Kotlin", "lesson-${lessonNumber}")\nprintln(tags${suffix}.size)`,
      `val scores${suffix} = mapOf("${title}" to ${value}, "lesson-${lessonNumber}" to ${scenario.value})\nprintln(scores${suffix}["${title}"])`,
      `data class ${className}(val title: String, val lesson: Int)\nval item${suffix} = ${className}("${title}", ${lessonNumber})\nprintln(item${suffix}.title)`,
      `val result${suffix} = try { ${value} / ${scenario.value} } catch (error: ArithmeticException) { 0 }\nprintln(result${suffix})`,
      `data class Lesson${suffix}(val title: String, val number: Int)\nval jsonText${suffix} = """{"title":"${title}","number":${lessonNumber}}"""\nprintln(jsonText${suffix})`,
      `val scores${suffix} = listOf(${scenario.value}, ${value}, ${lessonNumber + 1})\nprintln(scores${suffix}.maxOrNull())`,
      `val values${suffix} = listOf(${scenario.value}, ${value}, ${lessonNumber + 2})\nprintln(values${suffix}.map { it * 2 })`,
    ]
    return examples[topicIndex]
  }

  if (language === 'Go') {
    const examples = [
      `package main\nimport "fmt"\nfunc main() {\n    ${variable} := ${value}\n    fmt.Println("${title}", ${variable})\n}`,
      `package main\nimport "fmt"\nfunc main() {\n    label${suffix} := "${title}"\n    fmt.Printf("درس ${lessonNumber}: %s\\\\n", label${suffix})\n}`,
      `package main\nimport "fmt"\nfunc main() {\n    total${suffix} := ${scenario.value} * ${lessonNumber}\n    fmt.Println(total${suffix})\n}`,
      `package main\nimport "fmt"\nfunc main() {\n    ready${suffix} := ${value} >= ${scenario.value}\n    fmt.Println(ready${suffix})\n}`,
      `package main\nimport "fmt"\nfunc main() {\n    score${suffix} := ${value}\n    if score${suffix} >= ${scenario.value} { fmt.Println("مكتمل") } else { fmt.Println("قيد التعلم") }\n}`,
      `package main\nimport "fmt"\nfunc main() {\n    items${suffix} := []string{"${title}", "مثال ${lessonNumber}"}\n    for index, item := range items${suffix} { fmt.Println(index, item) }\n}`,
      `package main\nimport "fmt"\nfunc main() {\n    values${suffix} := []int{${scenario.value}, ${value}, ${lessonNumber + 2}}\n    fmt.Println(values${suffix}[1:])\n}`,
      `package main\nimport "fmt"\nfunc main() {\n    values${suffix} := []int{${scenario.value}, ${value}, ${lessonNumber + 2}}\n    for _, item := range values${suffix} { if item >= ${scenario.value} { fmt.Println(item) } }\n}`,
      `package main\nimport "fmt"\nfunc main() {\n    details${suffix} := map[string]string{"title": "${title}"}\n    fmt.Println(details${suffix}["title"])\n}`,
      `package main\nimport "fmt"\nfunc add${suffix}(a, b int) int { return a + b }\nfunc main() { fmt.Println(add${suffix}(${scenario.value}, ${lessonNumber})) }`,
      `package main\nimport "fmt"\nfunc scale${suffix}(step int) int { return step + ${lessonNumber} }\nfunc main() { fmt.Println(scale${suffix}(${scenario.value})) }`,
      `package main\nimport ("fmt"; "sort")\nfunc main() {\n    values${suffix} := []int{${scenario.value}, ${value}, ${lessonNumber + 2}}\n    sort.Ints(values${suffix})\n    fmt.Println(values${suffix})\n}`,
      `package main\nimport "fmt"\nfunc main() {\n    tags${suffix} := map[string]bool{"${title}": true, "lesson-${lessonNumber}": true}\n    fmt.Println(len(tags${suffix}))\n}`,
      `package main\nimport "fmt"\nfunc main() {\n    scores${suffix} := map[string]int{"${title}": ${value}}\n    fmt.Println(scores${suffix}["${title}"])\n}`,
      `package main\nimport "fmt"\ntype Lesson${suffix} struct { Title string; Number int }\nfunc main() { item := Lesson${suffix}{"${title}", ${lessonNumber}}; fmt.Println(item.Title) }`,
      `package main\nimport "fmt"\nfunc main() {\n    result${suffix} := ${value} / ${scenario.value}\n    fmt.Println(result${suffix})\n}`,
      `package main\nimport ("encoding/json"; "fmt")\nfunc main() {\n    record := map[string]interface{}{"title": "${title}", "lesson": ${lessonNumber}}\n    data, _ := json.Marshal(record)\n    fmt.Println(string(data))\n}`,
      `package main\nimport "fmt"\nfunc main() {\n    scores${suffix} := []int{${scenario.value}, ${value}, ${lessonNumber + 1}}\n    best := scores${suffix}[0]\n    for _, score := range scores${suffix} { if score > best { best = score } }\n    fmt.Println(best)\n}`,
      `package main\nimport "fmt"\nfunc main() {\n    value${suffix} := ${scenario.value}\n    for step := 1; step <= ${lessonNumber}; step++ { value${suffix} += step }\n    fmt.Println(value${suffix})\n}`,
    ]
    return examples[topicIndex]
  }

  if (language === 'PHP') {
    const examples = [
      `<?php\n$${variable} = ${value};\necho "${title}: " . $${variable};`,
      `<?php\n$label${suffix} = "${title}";\necho "درس ${lessonNumber}: {$label${suffix}}";`,
      `<?php\n$total${suffix} = ${scenario.value} * ${lessonNumber};\necho $total${suffix};`,
      `<?php\n$ready${suffix} = ${value} >= ${scenario.value};\necho $ready${suffix} ? "جاهز" : "قيد التعلم";`,
      `<?php\n$score${suffix} = ${value};\nif ($score${suffix} >= ${scenario.value}) {\n    echo "${title}: مكتمل";\n} else {\n    echo "قيد التعلم";\n}`,
      `<?php\n$items${suffix} = ["${title}", "مثال ${lessonNumber}"];\nforeach ($items${suffix} as $item) {\n    echo $item . PHP_EOL;\n}`,
      `<?php\n$values${suffix} = [${scenario.value}, ${value}, ${lessonNumber + 2}];\nprint_r(array_slice($values${suffix}, 1));`,
      `<?php\n$values${suffix} = [${scenario.value}, ${value}, ${lessonNumber + 2}];\n$large${suffix} = array_filter($values${suffix}, fn($item) => $item >= ${scenario.value});\nprint_r($large${suffix});`,
      `<?php\n$details${suffix} = ["title" => "${title}", "lesson" => ${lessonNumber}];\necho $details${suffix}["title"];`,
      `<?php\nfunction ${variable}($first, $second) { return $first + $second; }\necho ${variable}(${scenario.value}, ${lessonNumber});`,
      `<?php\nfunction ${variable}($step = ${scenario.value}) { return $step + ${lessonNumber}; }\necho ${variable}();`,
      `<?php\n$values${suffix} = [${scenario.value}, ${value}, ${lessonNumber + 2}];\nsort($values${suffix});\nprint_r($values${suffix});`,
      `<?php\n$tags${suffix} = array_unique(["${title}", "PHP", "lesson-${lessonNumber}"]);\necho count($tags${suffix});`,
      `<?php\n$scores${suffix} = ["${title}" => ${value}, "lesson-${lessonNumber}" => ${scenario.value}];\necho $scores${suffix}["${title}"];`,
      `<?php\nclass Lesson${suffix} {\n    public function __construct(public string $title = "${title}") {}\n}\necho (new Lesson${suffix}())->title;`,
      `<?php\ntry {\n    echo ${value} / ${scenario.value};\n} catch (Throwable $error) {\n    echo "تعذر الحساب";\n}`,
      `<?php\n$record${suffix} = ["title" => "${title}", "lesson" => ${lessonNumber}];\necho json_encode($record${suffix}, JSON_UNESCAPED_UNICODE);`,
      `<?php\n$scores${suffix} = [${scenario.value}, ${value}, ${lessonNumber + 1}];\necho max($scores${suffix});`,
      `<?php\n$values${suffix} = [${scenario.value}, ${value}, ${lessonNumber + 2}];\n$scaled${suffix} = array_map(fn($item) => $item * 2, $values${suffix});\nprint_r($scaled${suffix});`,
    ]
    return examples[topicIndex]
  }

  if (language === 'C#') {
    const examples = [
      `int ${variable} = ${value};\nConsole.WriteLine($"{title}: {${variable}}");`,
      `string label${suffix} = "${title}";\nConsole.WriteLine($"درس ${lessonNumber}: {label${suffix}}");`,
      `int total${suffix} = ${scenario.value} * ${lessonNumber};\nConsole.WriteLine(total${suffix});`,
      `bool ready${suffix} = ${value} >= ${scenario.value};\nConsole.WriteLine(ready${suffix} ? "جاهز" : "قيد التعلم");`,
      `int score${suffix} = ${value};\nif (score${suffix} >= ${scenario.value}) {\n    Console.WriteLine("${title}: مكتمل");\n} else {\n    Console.WriteLine("قيد التعلم");\n}`,
      `string[] items${suffix} = { "${title}", "مثال ${lessonNumber}" };\nforeach (string item in items${suffix}) Console.WriteLine(item);`,
      `int[] values${suffix} = { ${scenario.value}, ${value}, ${lessonNumber + 2} };\nConsole.WriteLine(values${suffix}[1]);`,
      `int[] values${suffix} = { ${scenario.value}, ${value}, ${lessonNumber + 2} };\nvar large${suffix} = values${suffix}.Where(item => item >= ${scenario.value});\nConsole.WriteLine(string.Join(", ", large${suffix}));`,
      `var details${suffix} = new { Title = "${title}", Lesson = ${lessonNumber} };\nConsole.WriteLine(details${suffix}.Title);`,
      `int Add${suffix}(int first, int second) => first + second;\nConsole.WriteLine(Add${suffix}(${scenario.value}, ${lessonNumber}));`,
      `int Scale${suffix}(int step = ${scenario.value}) => step + ${lessonNumber};\nConsole.WriteLine(Scale${suffix}());`,
      `int[] values${suffix} = { ${scenario.value}, ${value}, ${lessonNumber + 2} };\nArray.Sort(values${suffix});\nConsole.WriteLine(string.Join(", ", values${suffix}));`,
      `var tags${suffix} = new HashSet<string> { "${title}", "C#", "lesson-${lessonNumber}" };\nConsole.WriteLine(tags${suffix}.Count);`,
      `var scores${suffix} = new Dictionary<string, int> { ["${title}"] = ${value} };\nConsole.WriteLine(scores${suffix}["${title}"]);`,
      `record Lesson${suffix}(string Title, int Number);\nvar item${suffix} = new Lesson${suffix}("${title}", ${lessonNumber});\nConsole.WriteLine(item${suffix}.Title);`,
      `try {\n    Console.WriteLine(${value} / ${scenario.value});\n} catch (DivideByZeroException) {\n    Console.WriteLine("تعذر الحساب");\n}`,
      `var record${suffix} = new { Title = "${title}", Lesson = ${lessonNumber} };\nConsole.WriteLine(JsonSerializer.Serialize(record${suffix}));`,
      `int[] scores${suffix} = { ${scenario.value}, ${value}, ${lessonNumber + 1} };\nConsole.WriteLine(scores${suffix}.Max());`,
      `var values${suffix} = new[] { ${scenario.value}, ${value}, ${lessonNumber + 2} };\nConsole.WriteLine(string.Join(", ", values${suffix}.Select(item => item * 2)));`,
    ]
    return examples[topicIndex]
  }

  if (language === 'C++') {
    const examples = [
      `#include <iostream>\nint main() {\n    int ${variable} = ${value};\n    std::cout << "${title}: " << ${variable} << std::endl;\n}`,
      `#include <iostream>\nint main() {\n    std::string label${suffix} = "${title}";\n    std::cout << label${suffix} << " — درس ${lessonNumber}" << std::endl;\n}`,
      `#include <iostream>\nint main() {\n    int total${suffix} = ${scenario.value} * ${lessonNumber};\n    std::cout << total${suffix} << std::endl;\n}`,
      `#include <iostream>\nint main() {\n    bool ready${suffix} = ${value} >= ${scenario.value};\n    std::cout << std::boolalpha << ready${suffix} << std::endl;\n}`,
      `#include <iostream>\nint main() {\n    int score${suffix} = ${value};\n    if (score${suffix} >= ${scenario.value}) std::cout << "${title}: مكتمل";\n    else std::cout << "قيد التعلم";\n}`,
      `#include <iostream>\n#include <vector>\nint main() {\n    std::vector<std::string> items = {"${title}", "مثال ${lessonNumber}"};\n    for (const auto& item : items) std::cout << item << std::endl;\n}`,
      `#include <iostream>\n#include <vector>\nint main() {\n    std::vector<int> values = {${scenario.value}, ${value}, ${lessonNumber + 2}};\n    std::cout << values.at(1) << std::endl;\n}`,
      `#include <algorithm>\n#include <vector>\nint main() {\n    std::vector<int> values = {${scenario.value}, ${value}, ${lessonNumber + 2}};\n    values.erase(std::remove_if(values.begin(), values.end(), [](int n) { return n < ${scenario.value}; }), values.end());\n}`,
      `#include <string>\nstruct Lesson${suffix} { std::string title = "${title}"; int number = ${lessonNumber}; };`,
      `int add${suffix}(int first, int second) { return first + second; }\nint result${suffix} = add${suffix}(${scenario.value}, ${lessonNumber});`,
      `auto scale${suffix} = [](int step = ${scenario.value}) { return step + ${lessonNumber}; };\nint result${suffix} = scale${suffix}();`,
      `#include <algorithm>\n#include <vector>\nstd::vector<int> values = {${scenario.value}, ${value}, ${lessonNumber + 2}};\nstd::sort(values.begin(), values.end());`,
      `#include <set>\nstd::set<std::string> tags = {"${title}", "C++", "lesson-${lessonNumber}"};`,
      `#include <map>\nstd::map<std::string, int> scores = {{"${title}", ${value}}};\nint score = scores["${title}"];`,
      `#include <string>\nstruct Lesson${suffix} { std::string title; int number; };\nLesson${suffix} item{"${title}", ${lessonNumber}};`,
      `#include <iostream>\nint main() {\n    if (${scenario.value} == 0) std::cout << "تعذر الحساب";\n    else std::cout << ${value} / ${scenario.value};\n}`,
      `#include <string>\nstd::string json = "{\\"title\\":\\"${title}\\",\\"lesson\\":${lessonNumber}}";`,
      `#include <algorithm>\n#include <vector>\nstd::vector<int> scores = {${scenario.value}, ${value}, ${lessonNumber + 1}};\nint best = *std::max_element(scores.begin(), scores.end());`,
      `#include <vector>\nstd::vector<int> values = {${scenario.value}, ${value}, ${lessonNumber + 2}};\nfor (int& item : values) item *= 2;`,
    ]
    return examples[topicIndex]
  }

  if (language === 'JavaScript' || language === 'TypeScript') {
    const type = language === 'TypeScript' ? ': number' : ''
    const examples = [
      `const ${variable}${type} = ${value};\nconsole.log("${title}", ${variable});`,
      `const label${suffix} = "${title}";\nconsole.log(\`درس ${lessonNumber}: \${label${suffix}}\`);`,
      `const total${suffix}${type} = ${scenario.value} * ${lessonNumber};\nconsole.log(total${suffix});`,
      `const isReady${suffix} = ${value} >= ${scenario.value};\nconsole.log(isReady${suffix} ? "جاهز" : "قيد التعلم");`,
      `const score${suffix} = ${value};\nif (score${suffix} >= ${scenario.value}) {\n  console.log("${title}: مكتمل");\n} else {\n  console.log("قيد التعلم");\n}`,
      `const items${suffix} = ["${title}", "مثال ${lessonNumber}", "تطبيق"];\nfor (const item of items${suffix}) console.log(item);`,
      `const values${suffix} = [${scenario.value}, ${value}, ${lessonNumber + 2}];\nconsole.log(values${suffix}.slice(1));`,
      `const values${suffix} = [${scenario.value}, ${value}, ${lessonNumber + 2}];\nconst large${suffix} = values${suffix}.filter((item) => item >= ${scenario.value});\nconsole.log(large${suffix});`,
      `const details${suffix} = { title: "${title}", lesson: ${lessonNumber} };\nconsole.log(details${suffix}.title);`,
      `function ${variable}(first, second) { return first + second; }\nconsole.log(${variable}(${scenario.value}, ${lessonNumber}));`,
      `const ${variable} = (step = ${scenario.value}) => step + ${lessonNumber};\nconsole.log(${variable}());`,
      `const values${suffix} = [${scenario.value}, ${value}, ${lessonNumber + 2}];\nconsole.log([...values${suffix}].sort((a, b) => a - b));`,
      `const tags${suffix} = new Set(["${title}", "JavaScript", "lesson-${lessonNumber}"]);\nconsole.log(tags${suffix}.size);`,
      `const scores${suffix} = new Map([["${title}", ${value}], ["lesson-${lessonNumber}", ${scenario.value}]]);\nconsole.log(scores${suffix}.get("${title}"));`,
      `class ${variable.charAt(0).toUpperCase() + variable.slice(1)} {\n  constructor() { this.title = "${title}"; this.lesson = ${lessonNumber}; }\n}\nconsole.log(new ${variable.charAt(0).toUpperCase() + variable.slice(1)}().title);`,
      `const values${suffix} = [${scenario.value}, ${value}];\nconst result${suffix} = values${suffix}.reduce((sum, item) => sum + item, 0);\nconsole.log(result${suffix});`,
      `try {\n  console.log(${value} / ${scenario.value});\n} catch (error) {\n  console.error("تعذر حساب ${title}", error);\n}`,
      `const record${suffix} = { title: "${title}", lesson: ${lessonNumber} };\nconsole.log(JSON.stringify(record${suffix}, null, 2));`,
      `const scores${suffix} = [${scenario.value}, ${value}, ${lessonNumber + 1}];\nconsole.log(Math.max(...scores${suffix}));`,
    ]
    return examples[topicIndex]
  }

  const print = language === 'Ruby' ? (value) => `puts ${value}` :
    language === 'PHP' ? (value) => `echo ${value};` :
      language === 'Go' ? (value) => `fmt.Println(${value})` :
        language === 'C++' ? (value) => `cout << ${value} << endl;` :
          language === 'C#' ? (value) => `Console.WriteLine(${value});` :
            language === 'Kotlin' ? (value) => `println(${value})` :
              language === 'Swift' ? (value) => `print(${value})` :
                (value) => `System.out.println(${value});`
  const literal = language === 'PHP' ? `$${variable}` :
    language === 'Ruby' ? `:${variable}` :
      variable
  const stringValue = language === 'PHP' ? `'${title}'` : `"${title}"`
  const declaration = language === 'PHP' ? `$${variable} = ${value};` :
    language === 'Ruby' ? `${variable} = ${value}` :
      language === 'Go' ? `${variable} := ${value}` :
        language === 'Swift' || language === 'Kotlin' ? `val ${variable} = ${value}` :
          language === 'C#' ? `var ${variable} = ${value};` :
            language === 'C++' ? `int ${variable} = ${value};` :
              `int ${variable} = ${value};`
  const examples = [
    `${declaration}\n${print(`"${title}"`)}\n${print(literal)}`,
    `String label${suffix} = "${title}";\n${print(`label${suffix}`)}`,
    `${declaration}\nint total${suffix} = ${scenario.value} * ${lessonNumber};\n${print(`total${suffix}`)}`,
    `${declaration}\n${print(`${literal} >= ${scenario.value}`)}`,
    `${declaration}\nif (${literal} >= ${scenario.value}) {\n    ${print(stringValue)}\n} else {\n    ${print('"قيد التعلم"')}\n}`,
    `String[] items${suffix} = {"${title}", "مثال ${lessonNumber}"};\nfor (String item : items${suffix}) {\n    ${print('item')}\n}`,
    `int[] values${suffix} = {${scenario.value}, ${value}, ${lessonNumber + 2}};\n${print(`values${suffix}[1]`)}`,
    `int[] values${suffix} = {${scenario.value}, ${value}, ${lessonNumber + 2}};\nfor (int item : values${suffix}) {\n    if (item >= ${scenario.value}) ${print('item')}\n}`,
    `String title${suffix} = "${title}";\nint lesson${suffix} = ${lessonNumber};\n${print(`title${suffix} + " #" + lesson${suffix}`)}`,
    `static int ${variable}(int first, int second) {\n    return first + second;\n}\n${print(`${variable}(${scenario.value}, ${lessonNumber})`)}`,
    `int ${variable}(int step = ${scenario.value}) {\n    return step + ${lessonNumber};\n}\n${print(`${variable}()`)}`,
    `int[] values${suffix} = {${scenario.value}, ${value}, ${lessonNumber + 2}};\nArrays.sort(values${suffix});\n${print(`values${suffix}[0]`)}`,
    `Set<String> tags${suffix} = new HashSet<>();\ntags${suffix}.add("${title}");\ntags${suffix}.add("lesson-${lessonNumber}");\n${print(`tags${suffix}.size()`)}`,
    `Map<String, Integer> scores${suffix} = new HashMap<>();\nscores${suffix}.put("${title}", ${value});\n${print(`scores${suffix}.get("${title}")`)}`,
    `class ${variable.charAt(0).toUpperCase() + variable.slice(1)} {\n    String title = "${title}";\n    int lesson = ${lessonNumber};\n}\n${print(`new ${variable.charAt(0).toUpperCase() + variable.slice(1)}().title`)}`,
    `try {\n    ${print(`${value} / ${scenario.value}`)}\n} catch (Exception error) {\n    ${print('"تعذر الحساب"')}\n}`,
    `String json${suffix} = "{\\"title\\":\\"${title}\\",\\"lesson\\":${lessonNumber}}";\n${print(`json${suffix}`)}`,
    `int[] scores${suffix} = {${scenario.value}, ${value}, ${lessonNumber + 1}};\nint best${suffix} = Arrays.stream(scores${suffix}).max().orElse(0);\n${print(`best${suffix}`)}`,
  ]
  if (language === 'PHP') {
    return examples[topicIndex].replaceAll(/\bString\b/g, 'string').replaceAll(/\bint\b/g, 'int').replaceAll(/\bArrays\.sort\(([^)]+)\);/g, 'sort($1);').replaceAll(/\bArrays\.stream\(([^)]+)\)\.max\(\)\.orElse\(0\)/g, 'max($1)')
  }
  return examples[topicIndex]
}

function buildPracticeLesson(language, index) {
  const topicIndex = index % lessonTopics.length
  const scenario = lessonScenarios[Math.floor(index / lessonTopics.length)]
  const lessonNumber = index + 1
  const topic = lessonTopics[topicIndex]
  const explanation = lessonExplanations[topicIndex]
  const code = createLessonCode(language, topicIndex, scenario, lessonNumber)
  return {
    title: `${topic}: ${scenario.name}`,
    description: `الدرس ${lessonNumber} من ${language}: ${explanation} نطبّق ذلك على ${scenario.name} باستخدام ${scenario.field}، ثم نغيّر القيمة ونلاحظ أثرها.`,
    code,
    output: `${scenario.label}\nقيمة ${scenario.field}: ${scenario.value}\nقيمة المثال بعد التغيير: ${scenario.value + lessonNumber}`,
    notes: [
      explanation,
      `ابحث في الكود عن ${scenario.field} وغيّر قيمته من ${scenario.value}، ثم توقّع النتيجة قبل تشغيل المثال.`,
      `هذا المثال يشرح ${topic} باستخدام ${language}؛ قارِن القيم قبل التغيير وبعده.`,
    ],
  }
}

const worldLanguageTopics = [
  'المفردات والنطق', 'تكوين الجمل', 'الأسئلة اليومية', 'التعارف والمحادثة',
  'التعبير عن الرغبات', 'السؤال عن الأماكن', 'الأسعار والتسوق', 'التعبير عن الاحتياجات',
  'طلب المساعدة', 'التحدث عن العمل', 'استخدام الماضي', 'التحدث عن المستقبل',
  'التعبير عن الخبرة', 'المدة الزمنية', 'الجمل الشرطية', 'إبداء الرأي',
  'شرح الأسباب', 'الجمل الموصولة', 'تكوين جمل متقدمة', 'مراجعة المحادثة',
]

function getWorldLanguageLevel(index) {
  if (index < 167) return 'مبتدئ'
  if (index < 334) return 'متوسط'
  return 'متقدم'
}

function buildWorldLanguageLesson(language, index) {
  const topicIndex = index % worldLanguageTopics.length
  const wordIndex = Math.floor(index / worldLanguageTopics.length)
  const topic = worldLanguageTopics[topicIndex]
  const [word, meaning] = language.words[wordIndex]
  const [sentence, pronunciation, translation] = language.phrases[topicIndex]
  const replaceWord = (text) => text.replaceAll('{word}', word).replaceAll('{meaning}', meaning)
  const level = getWorldLanguageLevel(index)

  return {
    title: `${topic}: ${word} — الدرس ${index + 1}`,
    description: `درس ${level} في ${language.title}. تعلّم معنى كلمة «${word}» واستخدمها في سياق ${topic}، ثم اقرأ الجملة وجرّب تكوين جملة مشابهة من عندك.`,
    code: replaceWord(sentence),
    pronunciation: replaceWord(pronunciation),
    output: replaceWord(translation),
    level,
    notes: [
      `معنى الكلمة الأساسية «${word}» هو «${meaning}».`,
      `النطق التقريبي: ${replaceWord(pronunciation)}`,
      `ركّز في هذا الدرس على ${topic}، ثم استبدل الكلمة بكلمة أخرى تعرفها.`,
    ],
  }
}

function getCourseLessons(course) {
  if (course.courseType === 'world-language') {
    const language = worldLanguages.find((item) => item.id === course.languageId)
    if (!language) throw new Error(`Unknown world language course: ${course.languageId}`)
    return Array.from({ length: worldLanguageLessons }, (_, index) => buildWorldLanguageLesson(language, index))
  }

  return getBookLessons(course.language)
}

function buildCourseQuiz(course, lessons) {
  return getCourseQuiz(course, lessons)
}

function getBookLessons(language) {
  const examples = lessonsByLanguage[language] || []
  return Array.from({ length: lessonsPerBook }, (_, index) =>
    index < examples.length ? examples[index] : buildPracticeLesson(language, index),
  )
}

function SliderRail({
  children,
  label,
  className = '',
  autoPlay = true,
  autoPlayInterval = 3400,
}) {
  const railRef = useRef(null)
  const dragStartRef = useRef(null)
  const draggedRef = useRef(false)
  const [isPaused, setIsPaused] = useState(false)

  const slide = (direction) => {
    const rail = railRef.current
    if (!rail) return
    const maxScroll = rail.scrollWidth - rail.clientWidth
    if (maxScroll <= 5) return

    const step = Math.max(260, rail.clientWidth * 0.75)
    if (direction > 0) {
      if (rail.scrollLeft >= maxScroll - 15) {
        rail.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        rail.scrollBy({ left: step, behavior: 'smooth' })
      }
    } else {
      if (rail.scrollLeft <= 15) {
        rail.scrollTo({ left: maxScroll, behavior: 'smooth' })
      } else {
        rail.scrollBy({ left: -step, behavior: 'smooth' })
      }
    }
  }

  // تقليب تلقائي سلس مع توقف ذكي عند التفاعل
  useEffect(() => {
    if (!autoPlay || isPaused) return

    const timer = setInterval(() => {
      if (typeof document !== 'undefined' && document.hidden) return
      const rail = railRef.current
      if (!rail) return
      const maxScroll = rail.scrollWidth - rail.clientWidth
      if (maxScroll <= 10) return

      const step = Math.max(240, rail.clientWidth * 0.65)
      if (rail.scrollLeft >= maxScroll - 20) {
        rail.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        rail.scrollBy({ left: step, behavior: 'smooth' })
      }
    }, autoPlayInterval)

    return () => clearInterval(timer)
  }, [autoPlay, autoPlayInterval, isPaused])

  const startDragging = (event) => {
    if (event.button !== 0) return
    dragStartRef.current = { x: event.clientX, scrollLeft: railRef.current.scrollLeft }
    draggedRef.current = false
    setIsPaused(true)
  }

  const drag = (event) => {
    if (!dragStartRef.current) return
    const distance = event.clientX - dragStartRef.current.x
    if (Math.abs(distance) < 5 && !draggedRef.current) return
    draggedRef.current = true
    event.preventDefault()
    railRef.current.scrollLeft = dragStartRef.current.scrollLeft - distance
  }

  const finishDragging = () => {
    dragStartRef.current = null
    setIsPaused(false)
  }

  const preventDraggedClick = (event) => {
    if (!draggedRef.current) return
    event.preventDefault()
    event.stopPropagation()
    draggedRef.current = false
  }

  return (
    <div
      className={className}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="mb-2.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {autoPlay && (
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-medium transition ${
                isPaused
                  ? 'border-white/10 bg-white/[0.04] text-white/40'
                  : 'border-lime/30 bg-lime/[0.08] text-lime'
              }`}
              title={isPaused ? 'التقليب متوقف مؤقتًا للتصفح' : 'التقليب التلقائي نشط'}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${isPaused ? 'bg-white/40' : 'animate-pulse bg-lime'}`} />
              {isPaused ? 'تصفح يدوي' : 'تقليب تلقائي'}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => slide(1)}
            aria-label={`التمرير إلى اليمين: ${label}`}
            className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-white/55 transition hover:border-lime/30 hover:text-lime"
          >
            <ChevronRight size={16} />
          </button>
          <button
            onClick={() => slide(-1)}
            aria-label={`التمرير إلى اليسار: ${label}`}
            className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-white/55 transition hover:border-lime/30 hover:text-lime"
          >
            <ChevronLeft size={16} />
          </button>
        </div>
      </div>
      <div
        ref={railRef}
        dir="ltr"
        className="slider-rail scrollbar-hide flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-2"
        aria-label={label}
        onMouseDown={startDragging}
        onMouseMove={drag}
        onMouseUp={finishDragging}
        onMouseLeave={finishDragging}
        onClickCapture={preventDraggedClick}
        onDragStart={(event) => event.preventDefault()}
      >
        {children}
      </div>
    </div>
  )
}

const lessonsByLanguage = {
  JavaScript: [
    { title: 'المتغيرات وأنواع البيانات', description: 'المتغير مكان بنحتفظ فيه بقيمة نحتاجها بعدين. استخدم const للقيم الثابتة، وlet للقيم اللي هتتغير.', code: 'const student = "سارة";\nlet points = 0;\npoints = points + 10;\n\nconsole.log(`${student} جمعت ${points} نقطة`);', output: 'سارة جمعت 10 نقطة', notes: ['const يمنع إعادة تعيين المتغير، لكنه لا يجعل محتوى الكائن ثابتًا.', 'استخدم template literals لإدراج المتغيرات داخل النص باستخدام ${}.'] },
    { title: 'الشروط واتخاذ القرار', description: 'الشروط بتخلي البرنامج يختار مسارًا مختلفًا حسب قيمة معينة. هنا بنحدد إذا كان الطالب ناجحًا أم يحتاج للمراجعة.', code: 'const score = 82;\n\nif (score >= 50) {\n  console.log("ناجح، أحسنت!");\n} else {\n  console.log("حاول مرة أخرى");\n}', output: 'ناجح، أحسنت!', notes: ['يتم فحص الشرط بين القوسين أولًا.', 'كتلة else اختيارية وتعمل عندما يكون الشرط false.'] },
    { title: 'الدوال وإعادة استخدام الكود', description: 'الدالة تجمع خطوات لها اسم، وتقبل مدخلات لتنتج نتيجة. اكتبها مرة واستخدمها أكثر من مرة.', code: 'function greet(name) {\n  return `أهلًا يا ${name}`;\n}\n\nconst message = greet("علي");\nconsole.log(message);', output: 'أهلًا يا علي', notes: ['name معامل تستقبله الدالة.', 'return تعيد النتيجة لمكان استدعاء الدالة.'] },
  ],
  Python: [
    { title: 'المتغيرات والطباعة', description: 'بايثون لغة واضحة وبسيطة. نستخدم علامة = لتخزين قيمة، وprint لعرضها على الشاشة.', code: 'name = "مريم"\nlessons_done = 3\n\nprint(f"أهلًا {name}")\nprint(f"أنهيت {lessons_done} دروس")', output: 'أهلًا مريم\nأنهيت 3 دروس', notes: ['بايثون تحدد نوع القيمة تلقائيًا.', 'حرف f قبل النص يسمح بإدراج المتغيرات بين الأقواس المعقوفة.'] },
    { title: 'التكرار على قائمة', description: 'القائمة تخزن عدة عناصر، وتسمح حلقة for بالمرور على كل عنصر وتنفيذ نفس الأمر.', code: 'languages = ["Python", "SQL", "Go"]\n\nfor language in languages:\n    print(f"هتعلم {language}")', output: 'هتعلم Python\nهتعلم SQL\nهتعلم Go', notes: ['القوائم تكتب بين أقواس مربعة.', 'المسافة البادئة تحدد الأوامر التي تنتمي للحلقة.'] },
    { title: 'كتابة دالة', description: 'استخدم def لتعريف دالة. يمكن للدالة استقبال بيانات وإرجاع نتيجة قابلة لإعادة الاستخدام.', code: 'def add(first, second):\n    return first + second\n\nresult = add(12, 8)\nprint(result)', output: '20', notes: ['المعاملات تُكتب داخل الأقواس بعد اسم الدالة.', 'return تُرجع الناتج إلى مكان استدعاء الدالة.'] },
  ],
  SQL: [
    { title: 'اختيار البيانات باستخدام SELECT', description: 'SELECT هي نقطة البداية للاستعلام عن قاعدة البيانات. نحدد الأعمدة المطلوبة بعد الكلمة، ثم الجدول بعد FROM.', code: 'SELECT name, email\nFROM students;', output: 'name       | email\n-----------|-------------------\nسارة       | sara@example.com\nعلي        | ali@example.com', notes: ['استخدم * لاختيار كل الأعمدة، لكن تحديد الأعمدة المطلوبة أوضح وأسرع.', 'الفاصلة المنقوطة تنهي الاستعلام.'] },
    { title: 'تصفية النتائج باستخدام WHERE', description: 'WHERE تضيف شرطًا للنتائج، فتُرجع الصفوف التي تحقق الشرط فقط. يمكن دمج أكثر من شرط باستخدام AND أو OR.', code: 'SELECT name, score\nFROM students\nWHERE score >= 80\nORDER BY score DESC;', output: 'name       | score\n-----------|------\nمريم       | 95\nأحمد       | 88', notes: ['>= تعني أكبر من أو يساوي.', 'ORDER BY يرتب النتائج، وDESC يجعل الترتيب تنازليًا.'] },
    { title: 'ربط الجداول باستخدام JOIN', description: 'غالبًا تكون البيانات موزعة على جداول. JOIN يربط الصفوف باستخدام عمود مشترك مثل student_id.', code: 'SELECT students.name, courses.title\nFROM students\nJOIN enrollments\n  ON students.id = enrollments.student_id\nJOIN courses\n  ON courses.id = enrollments.course_id;', output: 'name       | title\n-----------|------------------\nمريم       | أساسيات SQL\nعلي        | Python للمبتدئين', notes: ['ON يحدد العلاقة بين الجدولين.', 'INNER JOIN يعرض الصفوف التي لها تطابق في الجدولين.'] },
  ],
  React: [
    { title: 'أول مكون React', description: 'المكون هو جزء واجهة قابل لإعادة الاستخدام. في JSX نكتب شكل الواجهة داخل دالة JavaScript.', code: 'function Welcome() {\n  return <h1>أهلًا بك في React!</h1>;\n}\n\nexport default Welcome;', output: 'يعرض عنوانًا: أهلًا بك في React!', notes: ['اسم المكون يبدأ بحرف كبير.', 'كل مكون React يعيد عناصر واجهة المستخدم.'] },
    { title: 'تمرير البيانات باستخدام props', description: 'props تسمح للمكون الأب بإرسال بيانات إلى المكون الابن، مثل الاسم أو عنوان الدورة.', code: 'function CourseCard({ title }) {\n  return <h2>{title}</h2>;\n}\n\n<CourseCard title="تعلم JavaScript" />', output: 'تعلم JavaScript', notes: ['نستقبل props ككائن ويمكن تفكيك title منه.', 'props للقراءة فقط داخل المكون.'] },
    { title: 'التفاعل مع useState', description: 'useState تحفظ قيمة داخل المكون. عند استدعاء دالة التحديث، يعيد React رسم الجزء الذي تغير.', code: 'const [count, setCount] = useState(0);\n\nreturn (\n  <button onClick={() => setCount(count + 1)}>\n    عدد النقرات: {count}\n  </button>\n);', output: 'كل نقرة تزيد العداد بمقدار واحد', notes: ['useState تعيد القيمة الحالية ودالة التحديث.', 'لا تعدّل الحالة مباشرة؛ استخدم دالة التحديث.'] },
  ],
  Flutter: [
    { title: 'أول واجهة Flutter', description: 'واجهة Flutter عبارة عن شجرة من Widgets. نستخدم MaterialApp كنقطة بداية لتطبيق بتصميم Material.', code: 'MaterialApp(\n  home: Scaffold(\n    appBar: AppBar(title: const Text("تطبيقي")),\n    body: const Center(\n      child: Text("أهلًا Flutter!"),\n    ),\n  ),\n);', output: 'صفحة بها شريط عنوان ونص في المنتصف', notes: ['Scaffold يوفر الهيكل الأساسي للشاشة.', 'Center يضع العنصر في منتصف المساحة المتاحة.'] },
    { title: 'ترتيب العناصر في عمود', description: 'Column ترتب العناصر رأسيًا، وRow ترتبها أفقيًا. استخدمهما لبناء تخطيطات مرنة.', code: 'Column(\n  mainAxisAlignment: MainAxisAlignment.center,\n  children: const [\n    Icon(Icons.school),\n    Text("ابدأ التعلم"),\n  ],\n);', output: 'أيقونة كتاب فوق عبارة ابدأ التعلم', notes: ['children قائمة العناصر داخل التخطيط.', 'mainAxisAlignment يتحكم في توزيعها على المحور الرئيسي.'] },
  ],
  Java: [
    { title: 'المتغيرات والطباعة', description: 'Java لغة قوية تعتمد على الأنواع المحددة. نكتب نوع المتغير قبل اسمه، ثم نستخدم System.out.println للطباعة.', code: 'String name = "Omar";\nint lessons = 3;\n\nSystem.out.println("Hello " + name);\nSystem.out.println(lessons + " lessons done");', output: 'Hello Omar\n3 lessons done', notes: ['String للنصوص وint للأعداد الصحيحة.', 'كل تعليمة تنتهي بفاصلة منقوطة.'] },
    { title: 'الشروط في Java', description: 'تُستخدم if لتنفيذ كود عند تحقق شرط، ويمكن استخدام else لمسار بديل.', code: 'int score = 85;\n\nif (score >= 50) {\n    System.out.println("Passed!");\n} else {\n    System.out.println("Try again");\n}', output: 'Passed!', notes: ['الأقواس المعقوفة تحدد كتلة كل حالة.', 'العامل >= يفحص أن الدرجة لا تقل عن 50.'] },
  ],
  TypeScript: [
    { title: 'الأنواع الأساسية', description: 'TypeScript تضيف أنواعًا إلى JavaScript لتكتشف الأخطاء مبكرًا، وتساعد المحرر على فهم بياناتك.', code: 'let username: string = "Salma";\nlet points: number = 120;\nlet isActive: boolean = true;\n\nconsole.log(username, points, isActive);', output: 'Salma 120 true', notes: ['string للنص، number للأرقام، وboolean للقيم المنطقية.', 'محاولة وضع قيمة من نوع خاطئ تُظهر خطأ أثناء التطوير.'] },
    { title: 'تعريف شكل البيانات', description: 'interface تصف شكل الكائن وتوثق الخصائص التي يجب أن يحتويها.', code: 'interface Course {\n  title: string;\n  lessons: number;\n}\n\nconst course: Course = {\n  title: "Learn TypeScript",\n  lessons: 24,\n};', output: 'كائن دورة متوافق مع النوع Course', notes: ['كل خاصية في الواجهة لها نوع محدد.', 'TypeScript تفحص توافق الكائن عند التطوير.'] },
  ],
  'C++': [
    { title: 'أول برنامج C++', description: 'يبدأ برنامج C++ من الدالة main. نستخدم cout لعرض النص وendl للانتقال لسطر جديد.', code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, world!" << endl;\n    return 0;\n}', output: 'Hello, world!', notes: ['include يضيف مكتبة الإدخال والإخراج.', 'main هي نقطة بدء تنفيذ البرنامج.'] },
    { title: 'المتغيرات والحساب', description: 'حدد نوع البيانات قبل اسم المتغير، ثم نفذ العمليات الحسابية باستخدام العلامات المعتادة.', code: 'int price = 40;\nint quantity = 3;\nint total = price * quantity;\n\ncout << total << endl;', output: '120', notes: ['int يخزن الأعداد الصحيحة.', 'المعامل * يضرب القيمتين.'] },
  ],
  HTML: [
    { title: 'هيكل صفحة HTML', description: 'HTML تصف بنية الصفحة. نستخدم العناصر الدلالية لتوضيح معنى كل جزء للمتصفح وأدوات الوصول.', code: '<!doctype html>\n<html lang="ar" dir="rtl">\n  <main>\n    <h1>مرحبًا بك</h1>\n    <p>هذه أول صفحة لي.</p>\n  </main>\n</html>', output: 'صفحة عربية بعنوان وفقرة نصية', notes: ['h1 هو العنوان الرئيسي، وp فقرة.', 'lang وdir يساعدان المتصفح على عرض العربية بالشكل الصحيح.'] },
    { title: 'الروابط والصور', description: 'الرابط ينقل المستخدم لوجهة أخرى، والصورة تحتاج وصفًا بديلًا لمساعدة قارئات الشاشة.', code: '<a href="https://example.com">\n  اكتشف المزيد\n</a>\n\n<img src="book.jpg" alt="كتاب برمجة">', output: 'رابط قابل للنقر وصورة موصوفة', notes: ['href يحدد وجهة الرابط.', 'alt يقدم وصفًا نصيًا للصورة.'] },
  ],
  CSS: [
    { title: 'تنسيق العناصر', description: 'CSS تفصل مظهر الصفحة عن بنيتها. حدد العنصر ثم اختر الخصائص مثل اللون والمسافات.', code: '.card {\n  background: #181817;\n  color: white;\n  padding: 24px;\n  border-radius: 16px;\n}', output: 'بطاقة داكنة ذات زوايا مستديرة ومساحة داخلية', notes: ['النقطة تستهدف عنصرًا يحمل class باسم card.', 'padding تضيف مساحة داخل العنصر.'] },
    { title: 'تخطيط مرن باستخدام Flexbox', description: 'Flexbox يرتب العناصر داخل حاوية، ويجعل محاذاتها وتوزيع المسافات بينها سهلًا.', code: '.row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n}', output: 'عناصر في صف بمحاذاة متساوية ومسافة بينها', notes: ['align-items تضبط المحور العرضي.', 'justify-content يوزع العناصر على المحور الرئيسي.'] },
  ],
  PHP: [
    { title: 'عرض البيانات', description: 'PHP تعمل على الخادم. نكتب الكود بين وسمي PHP، ونستخدم echo لإرسال النص إلى الصفحة.', code: '<?php\n$name = "Mona";\n$lessons = 5;\n\necho "Welcome, " . $name;\necho "Lessons: " . $lessons;\n?>', output: 'Welcome, Mona\nLessons: 5', notes: ['تبدأ أسماء المتغيرات بعلامة $.', 'النقطة . تربط النصوص ببعضها.'] },
    { title: 'الشروط والحلقات', description: 'تدعم PHP الشروط والحلقات لتنفيذ منطق متكرر على البيانات.', code: '<?php\n$score = 90;\n\nif ($score >= 50) {\n    echo "Passed";\n} else {\n    echo "Try again";\n}\n?>', output: 'Passed', notes: ['تُكتب كتلة الكود بين الأقواس المعقوفة.', 'تعمل else عند عدم تحقق الشرط.'] },
  ],
  MongoDB: [
    { title: 'إضافة مستند إلى مجموعة', description: 'MongoDB قاعدة بيانات مستندية. نخزن البيانات في مستندات شبيهة بكائنات JSON داخل مجموعة.', code: 'db.students.insertOne({\n  name: "سارة",\n  track: "SQL",\n  completedLessons: 3\n})', output: '{ acknowledged: true, insertedId: ObjectId(...) }', notes: ['students اسم المجموعة.', 'كل مستند يمكن أن يحتوي حقولًا متنوعة.'] },
    { title: 'البحث والتصفية', description: 'find للبحث عن مستندات، ويمكنك تمرير شروط للمطابقة. هنا نبحث عن الطلاب الذين أكملوا 3 دروس أو أكثر.', code: 'db.students.find({\n  completedLessons: { $gte: 3 }\n})', output: '{ name: "سارة", track: "SQL", completedLessons: 3 }', notes: ['$gte تعني أكبر من أو يساوي.', 'find يعيد كل المستندات المطابقة للشرط.'] },
  ],
  Kotlin: [
    { title: 'المتغيرات في Kotlin', description: 'استخدم val للقيمة التي لا يعاد تعيينها وvar للمتغير القابل للتغيير. يستنتج Kotlin النوع غالبًا.', code: 'val name = "Lina"\nvar completed = 2\ncompleted += 1\n\nprintln("$name finished $completed lessons")', output: 'Lina finished 3 lessons', notes: ['val يجعل المرجع غير قابل لإعادة التعيين.', 'تدعم Kotlin إدراج المتغيرات داخل النصوص.'] },
    { title: 'دالة بسيطة', description: 'تُعرّف الدوال باستخدام fun. يمكن تحديد نوع النتيجة بعد النقطتين.', code: 'fun greet(name: String): String {\n    return "Hello, $name"\n}\n\nprintln(greet("Lina"))', output: 'Hello, Lina', notes: ['name هو معامل نصي.', 'نوع النتيجة String.'] },
  ],
  Go: [
    { title: 'أول برنامج Go', description: 'كل برنامج Go يبدأ بالحزمة main، والتنفيذ يبدأ من الدالة main.', code: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, Go!")\n}', output: 'Hello, Go!', notes: ['fmt مكتبة تنسيق وطباعة النصوص.', 'الأقواس تحدد بداية ونهاية الدالة.'] },
    { title: 'الدوال والقيم المعادة', description: 'يمكن للدالة استقبال معاملات وإرجاع نتيجة بنوع واضح.', code: 'package main\nimport "fmt"\n\nfunc add(a int, b int) int {\n    return a + b\n}\n\nfunc main() {\n    fmt.Println(add(4, 6))\n}', output: '10', notes: ['نوع كل معامل يكتب بعد اسمه.', 'نوع القيمة المعادة int مكتوب بعد الأقواس.'] },
  ],
  default: [
    { title: 'أول خطوة في البرمجة', description: 'ابدأ بتعريف قيمة واضحة ثم استخدمها في تعليمة بسيطة. غيّر المثال وجرب بنفسك لتلاحظ النتيجة.', code: '// عرّف قيمة ثم استخدمها\nconst message = "أول خطوة في التعلم";\nconsole.log(message);', output: 'أول خطوة في التعلم', notes: ['المتغير يحتفظ بالقيمة لاستخدامها لاحقًا.', 'التجربة بتغيير القيم طريقة ممتازة للتعلم.'] },
    { title: 'فكر في حل المشكلة', description: 'قسّم المشكلة إلى خطوات صغيرة: حدد البيانات، نفذ العملية، ثم اعرض النتيجة.', code: 'const first = 12;\nconst second = 8;\nconst result = first + second;\n\nconsole.log(result);', output: '20', notes: ['كل خطوة لها غرض محدد.', 'جرب تغيير الأرقام ولاحظ الناتج.'] },
  ],
}

function CoursePage({ course, isStarted, onStart, onBack, onNavigate, onOpenAssistant, onInstallApp }) {
  const lessons = useMemo(() => getCourseLessons(course), [course.id])
  const quiz = useMemo(() => buildCourseQuiz(course, lessons), [course.id, lessons])
  const [activeLesson, setActiveLesson] = useState(0)
  const [completed, setCompleted] = useState([])
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizScore, setQuizScore] = useState(null)
  const [learnerName, setLearnerName] = useState('')
  const lessonListRef = useRef(null)
  const lesson = lessons[activeLesson]
  const isWorldLanguage = course.courseType === 'world-language'
  const certificateUnlocked = completed.length === lessons.length && quizScore !== null && quizScore >= 7

  useEffect(() => {
    const list = lessonListRef.current
    const activeItem = list?.querySelector(`[data-lesson-index="${activeLesson}"]`)
    if (!list || !activeItem) return

    const listBounds = list.getBoundingClientRect()
    const itemBounds = activeItem.getBoundingClientRect()
    if (itemBounds.top < listBounds.top) {
      list.scrollBy({ top: itemBounds.top - listBounds.top - 12, behavior: 'smooth' })
    } else if (itemBounds.bottom > listBounds.bottom) {
      list.scrollBy({ top: itemBounds.bottom - listBounds.bottom + 12, behavior: 'smooth' })
    }
  }, [activeLesson])

  const submitQuiz = () => {
    const score = quiz.reduce((total, question, index) => total + (quizAnswers[index] === question.answer ? 1 : 0), 0)
    setQuizScore(score)
  }

  const resetQuiz = () => {
    setQuizAnswers({})
    setQuizScore(null)
  }

  const copyExample = async () => {
    try {
      await navigator.clipboard.writeText(lesson.code)
      setCopied(true)
      setCopyError(false)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
      setCopyError(true)
    }
  }

  const completeLesson = () => setCompleted((current) => current.includes(activeLesson) ? current : [...current, activeLesson])
  const openLesson = (index) => {
    setActiveLesson(index)
    setCompleted((current) => current.filter((completedIndex) => completedIndex !== index))
  }

  return (
    <div className="min-h-screen bg-ink text-[#f4f3ef]" dir="rtl">
      <SiteNavbar page="course" course={course} onBack={onBack} onNavigate={onNavigate} onOpenAssistant={onOpenAssistant} onInstallApp={onInstallApp} completedCount={completed.length} lessonCount={lessons.length} isStarted={isStarted} onStart={onStart} />

      <div className="mx-auto grid max-w-[1240px] gap-8 px-4 py-7 sm:px-6 lg:grid-cols-[minmax(0,1fr)_310px] lg:gap-10 lg:py-10">
        <main className="min-w-0">
          <div className="mb-7">
            <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-lime"><span>{course.language}</span><span className="text-white/25">/</span><span>الدرس {activeLesson + 1}</span>{lesson.level && <span className="rounded-full border border-lime/20 bg-lime/[0.06] px-2.5 py-1">{lesson.level}</span>}</div>
            <h1 className="text-2xl font-bold leading-relaxed sm:text-3xl">{lesson.title}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-8 text-white/55">{lesson.description}</p>
          </div>

          <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#151614]">
            <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
              <div className="flex items-center gap-2 text-xs text-white/50"><Code2 size={15} className="text-lime" /><span>{lesson.pronunciation ? `العبارة باللغة ${course.language}` : 'المثال العملي'}</span></div>
              <button onClick={copyExample} className="flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1.5 text-[11px] text-white/55 transition hover:border-lime/30 hover:text-lime">{copied ? <Check size={13} /> : <Copy size={13} />}{copied ? 'تم النسخ' : isWorldLanguage ? 'نسخ النص' : 'نسخ الكود'}</button>
            </div>
            <pre dir="ltr" className={`scrollbar-hide overflow-x-auto p-5 font-mono text-[13px] leading-7 text-[#d8e0d0] sm:p-6 sm:text-sm ${lesson.pronunciation ? 'text-center text-lg sm:text-xl' : 'text-left'}`}><code>{lesson.code}</code></pre>
            {lesson.pronunciation && <p dir="rtl" className="border-t border-white/[0.07] px-5 py-3 text-sm leading-7 text-sky-200">النطق التقريبي: {lesson.pronunciation}</p>}
            {copyError && <p role="status" className="border-t border-white/[0.07] px-5 py-2.5 text-xs text-amber-300">تعذر نسخ {isWorldLanguage ? 'النص' : 'الكود'}. حدّد المحتوى وانسخه يدويًا.</p>}
          </section>

          <section className="mt-5 rounded-2xl border border-white/[0.08] bg-panel p-5 sm:p-6">
            <h2 className="flex items-center gap-2 text-sm font-bold"><Sparkles size={16} className="text-lime" /> شرح المثال</h2>
            <p className="mt-3 text-sm leading-8 text-white/55">{lesson.description}</p>
            <ul className="mt-3 space-y-2.5">{lesson.notes.map((note) => <li key={note} className="flex gap-2.5 text-sm leading-7 text-white/65"><CheckCircle2 size={16} className="mt-1 shrink-0 text-lime/80" /><span>{note}</span></li>)}</ul>
          </section>

          <section className="mt-5 overflow-hidden rounded-2xl border border-white/[0.08] bg-panel">
            <div className="flex items-center gap-2 border-b border-white/[0.07] px-5 py-3.5 text-xs font-semibold text-white/60"><Play size={14} className="text-lime" /> النتيجة المتوقعة</div>
            <pre dir="ltr" className="overflow-x-auto whitespace-pre-wrap p-5 text-left font-mono text-[13px] leading-6 text-lime/90">{lesson.output}</pre>
          </section>

          <div className="mt-6 flex flex-col-reverse justify-between gap-3 sm:flex-row">
            <button onClick={() => openLesson(Math.max(0, activeLesson - 1))} disabled={activeLesson === 0} className="rounded-xl border border-white/10 px-5 py-3 text-sm text-white/65 transition hover:border-white/25 disabled:cursor-not-allowed disabled:opacity-30">الدرس السابق</button>
            <button onClick={completeLesson} className={`rounded-xl px-5 py-3 text-sm font-bold transition ${completed.includes(activeLesson) ? 'border border-lime/30 bg-lime/10 text-lime' : 'bg-lime text-ink hover:bg-[#e2ff8c]'}`}>{completed.includes(activeLesson) ? <><Check size={15} className="ml-1 inline" /> أكملت هذا الدرس</> : 'علّم الدرس كمكتمل'}</button>
            <button onClick={() => openLesson(Math.min(lessons.length - 1, activeLesson + 1))} disabled={activeLesson === lessons.length - 1} className="rounded-xl border border-white/10 px-5 py-3 text-sm text-white/65 transition hover:border-white/25 disabled:cursor-not-allowed disabled:opacity-30">الدرس التالي</button>
          </div>

          {certificateUnlocked && <section className="mt-8 rounded-2xl border border-lime/25 bg-lime/[0.06] p-5 sm:p-7">
            <div className="flex items-center gap-3"><Award className="text-lime" size={24} /><div><h2 className="font-bold">مبروك! أكملت المسار</h2><p className="mt-1 text-xs text-white/50">اجتزت الاختبار وأكملت جميع الدروس. أدخل اسمك لطباعة الشهادة.</p></div></div>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <label className="sr-only" htmlFor="certificate-learner-name">اسم المتعلم على الشهادة</label>
              <input id="certificate-learner-name" value={learnerName} onChange={(event) => setLearnerName(event.target.value)} placeholder="اسم المتعلم" className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-lime/50" />
              <button onClick={() => window.print()} disabled={!learnerName.trim()} className="inline-flex items-center justify-center gap-2 rounded-xl bg-lime px-5 py-3 text-sm font-bold text-ink transition hover:bg-[#e2ff8c] disabled:cursor-not-allowed disabled:opacity-40"><Printer size={16} /> اطبع الشهادة</button>
            </div>
          </section>}
        </main>

        <aside className="h-fit rounded-2xl border border-white/[0.08] bg-panel p-5 lg:sticky lg:top-[92px]">
          <div className="flex items-start justify-between gap-3"><div><p className="text-xs text-white/40">مسار التعلم</p><h2 className="mt-1.5 text-sm font-bold leading-6">{course.title}</h2></div><span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[0.05] font-mono text-sm font-bold ${course.iconColor}`}>{course.icon}</span></div>
          <div className="mt-5"><div className="mb-2 flex justify-between text-[11px] text-white/45"><span>تقدمك في الدروس</span><span>{Math.round((completed.length / lessons.length) * 100)}%</span></div><div className="h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-lime transition-all" style={{ width: `${(completed.length / lessons.length) * 100}%` }} /></div></div>
          <div ref={lessonListRef} className="lesson-list-scrollbar mt-5 max-h-[min(65vh,560px)] space-y-1 overflow-y-auto overscroll-contain pl-1">{lessons.map((item, index) => <div key={item.title}>{course.courseType === 'world-language' && [0, 167, 334].includes(index) && <p className="sticky top-0 z-10 rounded-lg bg-panel px-3 py-2 text-[11px] font-bold text-lime">{getWorldLanguageLevel(index)} · الدروس {index + 1}–{index === 0 ? 167 : index === 167 ? 334 : 500}</p>}<button data-lesson-index={index} onClick={() => openLesson(index)} className={`flex w-full items-start gap-3 rounded-xl p-3 text-right transition ${activeLesson === index ? 'bg-lime/[0.08] text-lime' : 'text-white/55 hover:bg-white/[0.04]'}`}><span className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[10px] ${completed.includes(index) ? 'border-lime bg-lime text-ink' : activeLesson === index ? 'border-lime/50' : 'border-white/15'}`}>{completed.includes(index) ? <Check size={12} /> : index + 1}</span><span><span className="block text-xs font-semibold leading-5">{item.title}</span><span className="mt-1 block text-[10px] text-white/35">{item.level || 'مثال عملي'} · {index + 1} دقائق</span></span></button></div>)}</div>
          <div className="mt-5 rounded-xl border border-white/[0.07] bg-black/10 p-3.5 text-xs leading-6 text-white/40"><p className="font-semibold text-white/65">نصيحة للتعلم</p><p className="mt-1">اكتب الكود بنفسك وغيّر القيم، هتتعلم أسرع من مجرد القراءة.</p></div>
          <button onClick={() => { setShowQuiz(true); resetQuiz() }} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-lime px-4 py-3 text-sm font-bold text-ink transition hover:bg-[#e2ff8c]"><ClipboardCheck size={16} /> اختبر نفسك · 10 أسئلة</button>
          {quizScore !== null && <p className={`mt-3 text-center text-xs font-semibold ${quizScore >= 7 ? 'text-lime' : 'text-amber-300'}`}>آخر نتيجة: {quizScore}/10 {quizScore >= 7 ? '· اجتزت الاختبار' : '· تحتاج إلى 7 إجابات صحيحة'}</p>}
        </aside>
      </div>

      {certificateUnlocked && <section id="completion-certificate" dir="rtl" className="certificate-print-hidden mx-auto my-8 flex min-h-[430px] max-w-4xl flex-col items-center justify-center border-8 border-double border-lime/50 bg-[#151614] px-8 py-12 text-center">
        <Award size={52} className="text-lime" />
        <p className="mt-5 text-sm font-semibold tracking-[0.2em] text-lime">شهادة إتمام</p>
        <h2 className="mt-5 text-3xl font-bold">تشهد منصة كود بأن</h2>
        <p className="mt-5 border-b border-lime/40 px-8 pb-3 text-2xl font-bold">{learnerName.trim() || 'اسم المتعلم'}</p>
        <p className="mt-5 max-w-xl text-base leading-8 text-white/70">قد أتم بنجاح مسار <strong className="text-lime">{course.title}</strong>، وأكمل جميع الدروس واجتاز الاختبار النهائي بنتيجة {quizScore}/10.</p>
        <p className="mt-8 text-sm text-white/45">منصة كود · {new Date().toLocaleDateString('ar-EG')}</p>
      </section>}

      {showQuiz && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-6">
        <section role="dialog" aria-modal="true" aria-labelledby="course-quiz-title" className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-panel p-5 shadow-2xl sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div><p className="text-xs font-semibold text-lime">اختبار المسار · 10 أسئلة · النجاح من 7/10</p><h2 id="course-quiz-title" className="mt-2 text-xl font-bold">اختبر فهمك في {course.language}</h2></div>
            <button onClick={() => setShowQuiz(false)} aria-label="إغلاق الاختبار" className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 text-white/60 hover:text-white"><X size={18} /></button>
          </div>
          {quizScore === null ? <>
            <div className="mt-6 space-y-5">{quiz.map((question, questionIndex) => <fieldset key={question.prompt} className="rounded-xl border border-white/[0.08] p-4">
              <legend className="px-2 text-sm font-semibold leading-7">{questionIndex + 1}. {question.prompt}</legend>
              <div className="mt-2 space-y-2">{question.choices.map((choice) => <label key={choice} className={`flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2.5 text-sm leading-6 transition ${quizAnswers[questionIndex] === choice ? 'border-lime/40 bg-lime/[0.08]' : 'border-white/[0.06] hover:bg-white/[0.03]'}`}>
                <input type="radio" name={`quiz-question-${questionIndex}`} checked={quizAnswers[questionIndex] === choice} onChange={() => setQuizAnswers((current) => ({ ...current, [questionIndex]: choice }))} className="mt-1 accent-lime" />
                <span>{choice}</span>
              </label>)}</div>
            </fieldset>)}</div>
            <button onClick={submitQuiz} disabled={Object.keys(quizAnswers).length !== quiz.length} className="mt-6 w-full rounded-xl bg-lime px-5 py-3 font-bold text-ink hover:bg-[#e2ff8c] disabled:cursor-not-allowed disabled:opacity-40">إرسال الإجابات</button>
          </> : <div className="py-12 text-center">
            {quizScore >= 7 ? <CheckCircle2 size={48} className="mx-auto text-lime" /> : <RotateCcw size={48} className="mx-auto text-amber-300" />}
            <h3 className="mt-4 text-2xl font-bold">{quizScore}/10 {quizScore >= 7 ? '· اجتزت الاختبار!' : '· حاول مرة أخرى'}</h3>
            <p className="mt-2 text-sm text-white/55">{quizScore >= 7 ? completed.length === lessons.length ? 'أكملت المسار أيضًا، شهادتك جاهزة للطباعة.' : 'أكمل جميع الدروس لفتح شهادة الإتمام.' : 'تحتاج إلى 7 إجابات صحيحة على الأقل للنجاح.'}</p>
            <div className="mt-6 flex justify-center gap-3">
              <button onClick={resetQuiz} className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold hover:border-lime/40">إعادة الاختبار</button>
              <button onClick={() => setShowQuiz(false)} className="rounded-xl bg-lime px-5 py-3 text-sm font-bold text-ink">متابعة التعلم</button>
            </div>
          </div>}
        </section>
      </div>}
    </div>
  )
}

function SiteNavbar({ page, onNavigate, onOpenAssistant, onInstallApp, course, onBack, completedCount, lessonCount, isStarted, onStart }) {
  const [mobileMenu, setMobileMenu] = useState(false)
  const isCoursePage = Boolean(course)

  const navigate = (destination, section) => {
    setMobileMenu(false)
    onNavigate(destination, section)
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/[0.07] bg-ink/95 backdrop-blur">
        <div className="mx-auto flex min-h-[68px] max-w-[1240px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            {isCoursePage && <button onClick={onBack} className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 text-white/65 transition hover:border-lime/30 hover:text-lime" aria-label="العودة للدورات"><ArrowLeft size={18} /></button>}
            <button onClick={() => navigate('home')} className="flex shrink-0 items-center gap-2.5" aria-label="كود، الرئيسية">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-lime text-ink"><Code2 size={20} strokeWidth={2.5} /></span>
              {!isCoursePage && <span className="text-[22px] font-bold tracking-tight">كود<span className="text-lime">.</span></span>}
            </button>
            {isCoursePage && <div className="min-w-0"><p className="truncate text-sm font-bold">{course.language}</p><p className="hidden truncate text-[11px] text-white/40 sm:block">{course.title}</p></div>}
          </div>

          <nav className="hidden items-center gap-5 text-[13px] text-white/65 xl:flex">
            <button onClick={() => navigate('home', 'courses')} className="transition hover:text-lime">الدورات</button>
            <button onClick={() => navigate('home', 'paths')} className="transition hover:text-lime">المسارات</button>
            <button onClick={() => navigate('home', 'world-languages')} className="transition hover:text-lime">لغات العالم</button>
            <button onClick={() => navigate('about')} className={`transition hover:text-lime ${page === 'about' ? 'text-lime' : ''}`}>About</button>
            <button onClick={() => navigate('contact')} className={`transition hover:text-lime ${page === 'contact' ? 'text-lime' : ''}`}>Contact</button>
          </nav>

          <div className="hidden shrink-0 items-center gap-2 xl:flex">
            {isCoursePage && <span className="hidden text-[11px] text-white/40 xl:block">{completedCount} من {lessonCount} درس</span>}
            {isCoursePage && <button onClick={onStart} className={`rounded-xl px-3 py-2 text-xs font-bold transition ${isStarted ? 'border border-lime/30 bg-lime/10 text-lime' : 'bg-lime text-ink hover:bg-[#e2ff8c]'}`}>{isStarted ? 'أُضيف لمسارك' : 'ابدأ المسار'}</button>}
            <button onClick={onOpenAssistant} className="inline-flex items-center gap-1.5 rounded-xl border border-lime/25 px-3 py-2 text-xs font-semibold text-lime transition hover:bg-lime/10">
              <Bot size={15} /> AI
            </button>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="تواصل معنا عبر واتساب" className="inline-flex items-center gap-1.5 rounded-xl bg-[#25D366] px-3 py-2 text-xs font-bold text-[#092b16] transition hover:bg-[#55e889]"><MessageCircle size={15} /> واتساب</a>
          </div>

          <button className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 xl:hidden" onClick={() => setMobileMenu(!mobileMenu)} aria-label={mobileMenu ? 'إغلاق القائمة' : 'فتح القائمة'}>
            {mobileMenu ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
        {mobileMenu && <nav className="flex flex-col gap-1 border-t border-white/[0.07] bg-panel px-5 py-3 xl:hidden">
          {isCoursePage && <div className="flex items-center justify-between px-3 py-2 text-xs text-white/50"><span>{completedCount} من {lessonCount} درس مكتمل</span><button onClick={() => { setMobileMenu(false); onStart() }} className="font-bold text-lime">{isStarted ? 'أُضيف لمسارك' : 'ابدأ المسار'}</button></div>}
          <button onClick={() => navigate('home', 'courses')} className="rounded-lg px-3 py-3 text-right text-sm text-white/75 hover:bg-white/5">الدورات</button>
          <button onClick={() => navigate('home', 'paths')} className="rounded-lg px-3 py-3 text-right text-sm text-white/75 hover:bg-white/5">المسارات</button>
          <button onClick={() => navigate('home', 'world-languages')} className="rounded-lg px-3 py-3 text-right text-sm text-white/75 hover:bg-white/5">لغات العالم</button>
          <button onClick={() => navigate('about')} className="rounded-lg px-3 py-3 text-right text-sm text-white/75 hover:bg-white/5">About</button>
          <button onClick={() => navigate('contact')} className="rounded-lg px-3 py-3 text-right text-sm text-white/75 hover:bg-white/5">Contact</button>
          <button onClick={() => { setMobileMenu(false); onOpenAssistant() }} className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm text-lime hover:bg-white/5"><Bot size={16} /> اسأل AI</button>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm text-[#55e889] hover:bg-white/5"><MessageCircle size={16} /> تواصل عبر واتساب</a>
        </nav>}
      </header>
      <div aria-hidden="true" className={mobileMenu ? 'h-[430px]' : 'h-[68px]'} />
    </>
  )
}

function InstallModal({ onClose, deferredPrompt }) {
  const [activeTab, setActiveTab] = useState('windows')
  const [installing, setInstalling] = useState(false)
  const [installed, setInstalled] = useState(false)

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt()
        const choice = await deferredPrompt.userChoice
        if (choice.outcome === 'accepted') {
          setInstalled(true)
        }
      } catch {
        setInstalling(true)
        setTimeout(() => {
          setInstalling(false)
          setInstalled(true)
        }, 1200)
      }
    } else {
      setInstalling(true)
      setTimeout(() => {
        setInstalling(false)
        setInstalled(true)
      }, 1200)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <section role="dialog" aria-modal="true" aria-labelledby="install-modal-title" className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-panel p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl border border-lime/25 bg-lime/10 text-lime">
              <Code2 size={26} strokeWidth={2.5} />
            </span>
            <div>
              <h2 id="install-modal-title" className="text-lg font-bold">تثبيت تطبيق منصة كود</h2>
              <p className="text-xs text-white/45">تشغيل فوري، نافذة مستقلة، وسرعة أكبر</p>
            </div>
          </div>
          <button onClick={onClose} aria-label="إغلاق نافذة التثبيت" className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-white/55 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <div className="mt-5 rounded-xl border border-white/[0.08] bg-black/20 p-4 text-center">
          {installed ? (
            <div className="py-2">
              <CheckCircle2 size={36} className="mx-auto text-lime" />
              <p className="mt-2 text-sm font-bold text-white">تم تثبيت التطبيق بنجاح! 🎉</p>
              <p className="mt-1 text-xs text-white/50">يمكنك الآن فتح "منصة كود" كبرنامج مستقل من سطح المكتب أو الشاشة الرئيسية.</p>
            </div>
          ) : (
            <div>
              <p className="text-xs leading-6 text-white/70">
                يمكنك تثبيت المنصة كبرنامج رسمي PWA يعمل على جهازك دون الحاجة لشريط المتصفح، مع إمكانية الوصول السريع والدورات التفاعلية.
              </p>
              <button
                onClick={handleInstallClick}
                disabled={installing}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-lime py-3 text-sm font-bold text-ink transition hover:bg-[#e2ff8c] disabled:opacity-50"
              >
                {installing ? (
                  <>جاري تجهيز التثبيت...</>
                ) : (
                  <>
                    <Download size={16} /> تثبيت التطبيق الآن
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        <div className="mt-5">
          <p className="mb-2 text-xs font-semibold text-white/60">أو ثبته يدويًا حسب نوع جهازك:</p>
          <div className="grid grid-cols-3 gap-1.5 rounded-xl border border-white/[0.08] bg-black/20 p-1">
            <button
              onClick={() => setActiveTab('windows')}
              className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition ${
                activeTab === 'windows' ? 'bg-lime text-ink' : 'text-white/60 hover:text-white'
              }`}
            >
              <Monitor size={14} /> كمبيوتر
            </button>
            <button
              onClick={() => setActiveTab('android')}
              className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition ${
                activeTab === 'android' ? 'bg-lime text-ink' : 'text-white/60 hover:text-white'
              }`}
            >
              <Smartphone size={14} /> أندرويد
            </button>
            <button
              onClick={() => setActiveTab('ios')}
              className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition ${
                activeTab === 'ios' ? 'bg-lime text-ink' : 'text-white/60 hover:text-white'
              }`}
            >
              <Share2 size={14} /> آيفون
            </button>
          </div>

          <div className="mt-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-xs leading-6 text-white/70">
            {activeTab === 'windows' && (
              <ol className="list-inside list-decimal space-y-1">
                <li>في متصفح <strong>Chrome</strong> أو <strong>Edge</strong>، انظر إلى شريط العنوان في الأعلى جهة اليسار.</li>
                <li>اضغط على أيقونة التثبيت <span className="rounded bg-white/10 px-1 py-0.5 font-mono text-lime">⊕ تثبيت</span> أو <span className="rounded bg-white/10 px-1 py-0.5 font-mono text-lime">⤓</span>.</li>
                <li>اضغط على <strong>تثبيت (Install)</strong> وسيفتح التطبيق فورًا في نافذة مستقلة.</li>
              </ol>
            )}
            {activeTab === 'android' && (
              <ol className="list-inside list-decimal space-y-1">
                <li>اضغط على زر القائمة <span className="rounded bg-white/10 px-1.5 py-0.5 font-bold text-lime">⋮</span> أعلى يمين المتصفح.</li>
                <li>اختر <strong>"تثبيت التطبيق"</strong> أو <strong>"إضافة إلى الشاشة الرئيسية"</strong>.</li>
                <li>ستجد أيقونة التطبيق في شاشتك الرئيسية ويمكنك فتحها في أي وقت.</li>
              </ol>
            )}
            {activeTab === 'ios' && (
              <ol className="list-inside list-decimal space-y-1">
                <li>افتح الموقع عبر متصفح <strong>Safari</strong> على جهاز الآيفون أو الآيباد.</li>
                <li>اضغط على زر المشاركة بالأسفل <span className="rounded bg-white/10 px-1.5 py-0.5 font-bold text-lime">⎋ (Share)</span>.</li>
                <li>مرر لأسفل واضغط على <strong>"إضافة إلى الصفحة الرئيسية (Add to Home Screen)"</strong>.</li>
              </ol>
            )}
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button onClick={onClose} className="rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-white/70 hover:text-white">
            إغلاق
          </button>
        </div>
      </section>
    </div>
  )
}

function AssistantModal({ onClose }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'أهلًا بك! 👋 أنا مساعد كود الذكي.\nاسألني عن أي لغة برمجة (JavaScript, Python, React, Flutter, C++, SQL وغيرها) أو أي لغة من لغات العالم، وسأشرحها لك فورًا بالأمثلة العملية!',
    },
  ])
  const [question, setQuestion] = useState('')
  const [sending, setSending] = useState(false)
  const quickQuestions = [
    'ما أفضل لغة أبدأ بها؟ 🚀',
    'ما الفرق بين Python و JavaScript؟ ⚖️',
    'كيف أتعلم الإنجليزية أو الفرنسية بسرعة؟ 🌍',
    'اشرح لي فكرة الـ Virtual DOM في React ⚛️',
  ]

  const sendQuestionText = async (textToSend) => {
    const content = textToSend.trim()
    if (!content || sending) return
    const updatedMessages = [...messages, { role: 'user', content }]
    setMessages(updatedMessages)
    setQuestion('')
    setSending(true)

    try {
      const endpoint = import.meta.env.VITE_AI_CHAT_ENDPOINT || '/api/ai-chat'
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: content,
          history: updatedMessages.slice(-12).map(({ role, content: msg }) => ({ role, content: msg })),
        }),
      }).catch(() => null)

      let reply = ''
      if (response && response.ok) {
        const result = await response.json().catch(() => null)
        if (result && typeof result.reply === 'string' && result.reply.trim()) {
          reply = result.reply.trim()
        }
      }

      if (!reply) {
        reply = generateSmartAssistantReply(content, updatedMessages)
      }

      setMessages((current) => [...current, { role: 'assistant', content: reply }])
    } catch {
      const reply = generateSmartAssistantReply(content, updatedMessages)
      setMessages((current) => [...current, { role: 'assistant', content: reply }])
    } finally {
      setSending(false)
    }
  }

  const sendQuestion = (event) => {
    event.preventDefault()
    sendQuestionText(question)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 p-0 backdrop-blur-sm sm:items-center sm:p-5">
      <section role="dialog" aria-modal="true" aria-labelledby="assistant-title" className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl border border-white/10 bg-panel shadow-2xl sm:rounded-2xl">
        <header className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-lime/20 bg-lime/10 text-lime">
              <Bot size={20} />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="assistant-title" className="font-bold">مساعد كود الذكي</h2>
                <span className="rounded-md bg-lime/10 px-2 py-0.5 text-[10px] font-semibold text-lime">نشط الآن ✓</span>
              </div>
              <p className="mt-0.5 text-xs text-white/40">إجابات وشروحات فورية للبرمجة واللغات بالأمثلة</p>
            </div>
          </div>
          <button onClick={onClose} aria-label="إغلاق المساعد" className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-white/55 hover:text-white">
            <X size={18} />
          </button>
        </header>

        <div className="min-h-[260px] flex-1 space-y-3 overflow-y-auto p-5" aria-live="polite">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`max-w-[90%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-7 ${
                message.role === 'user'
                  ? 'mr-auto border border-lime/20 bg-lime/15 text-white'
                  : 'ml-auto border border-white/[0.07] bg-black/20 text-white/85 shadow-sm'
              }`}
            >
              {message.content}
            </div>
          ))}

          {sending && (
            <div className="ml-auto flex items-center gap-2 rounded-2xl border border-white/[0.07] bg-black/20 px-4 py-3 text-xs text-lime" role="status">
              <Sparkles size={14} className="animate-spin" />
              <span>المساعد يكتب الإجابة...</span>
            </div>
          )}

          {messages.length <= 2 && (
            <div className="mt-4 border-t border-white/[0.06] pt-3">
              <p className="mb-2 text-xs text-white/40">💡 أسئلة شائعة يمكنك تجربتها بنقرة واحدة:</p>
              <div className="flex flex-wrap gap-1.5">
                {quickQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendQuestionText(q)}
                    disabled={sending}
                    className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-xs text-white/70 transition hover:border-lime/40 hover:bg-lime/[0.06] hover:text-lime"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <form onSubmit={sendQuestion} className="flex items-end gap-2 border-t border-white/[0.08] p-4">
          <label className="sr-only" htmlFor="assistant-question">اكتب سؤالك</label>
          <textarea
            id="assistant-question"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault()
                sendQuestionText(question)
              }
            }}
            rows={2}
            placeholder="اكتب سؤالك عن البرمجة أو اللغات..."
            className="max-h-32 min-h-12 flex-1 resize-y rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-lime/50"
          />
          <button
            type="submit"
            disabled={!question.trim() || sending}
            aria-label="إرسال السؤال"
            className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-lime text-ink transition hover:bg-[#e2ff8c] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Send size={17} />
          </button>
        </form>
      </section>
    </div>
  )
}

function InfoPage({ page, onNavigate, onOpenAssistant, onInstallApp }) {
  const isAbout = page === 'about'

  return (
    <div className="min-h-screen bg-ink text-[#f4f3ef]" dir="rtl">
      <SiteNavbar page={page} onNavigate={onNavigate} onOpenAssistant={onOpenAssistant} onInstallApp={onInstallApp} />
      <main className="mx-auto min-h-[calc(100vh-150px)] max-w-[1240px] px-5 py-12 lg:px-8 lg:py-16">
        {isAbout ? <div className="space-y-8">
          <section className="relative overflow-hidden rounded-3xl border border-lime/15 bg-gradient-to-l from-lime/[0.12] via-lime/[0.04] to-transparent px-6 py-12 sm:px-10 sm:py-16">
            <div className="page-grid pointer-events-none absolute inset-0 opacity-50" />
            <div className="relative max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-lime/20 bg-lime/[0.07] px-3.5 py-2 text-xs font-medium text-lime"><Sparkles size={14} /> عن منصة كود</div>
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl">خطوتك القادمة تبدأ <span className="text-lime">بالتعلّم.</span></h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/60">منصة تعليمية عربية تساعدك تتعلم البرمجة ولغات العالم بطريقة عملية ومنظمة، من أول درس وحتى إتمام المسار.</p>
              <button onClick={() => onNavigate('home', 'courses')} className="mt-7 inline-flex items-center gap-2 rounded-xl bg-lime px-6 py-3 font-bold text-ink transition hover:bg-[#e2ff8c]">اكتشف الدورات <ArrowLeft size={16} /></button>
            </div>
          </section>
          <section className="grid gap-4 md:grid-cols-3">
            {[['188', 'درسًا في مسارات البرمجة', 'أمثلة عملية تشرح مفاهيم برمجية متعددة.'], ['500', 'درس في مسارات لغات العالم', 'تعلّم متدرج من المستوى المبتدئ إلى المتقدم.'], ['اختبار وشهادة', 'في كل مسار', 'اختبر فهمك واطبع شهادة الإتمام بعد استيفاء المتطلبات.']].map(([stat, title, description]) => <article key={title} className="rounded-2xl border border-white/[0.08] bg-panel p-6"><p className="text-2xl font-bold text-lime">{stat}</p><h2 className="mt-3 font-bold">{title}</h2><p className="mt-2 text-sm leading-7 text-white/50">{description}</p></article>)}
          </section>
          <section className="grid gap-5 rounded-2xl border border-white/[0.08] bg-panel p-6 sm:grid-cols-3 sm:p-8">
            {[['تعلّم بالممارسة', 'كل درس يشرح فكرة ويشجعك على التجربة والتطبيق.'], ['تقدّم واضح', 'تابع الدروس المكتملة ويُحفظ تقدمك على جهازك.'], ['مسارات متنوعة', 'اختر لغة برمجة أو لغة منطوقة حسب هدفك.']].map(([title, description]) => <div key={title}><h2 className="flex items-center gap-2 font-bold"><CheckCircle2 size={17} className="text-lime" />{title}</h2><p className="mt-2 text-sm leading-7 text-white/50">{description}</p></div>)}
          </section>
        </div> : <div className="space-y-8">
          <section className="relative overflow-hidden rounded-3xl border border-lime/15 bg-gradient-to-l from-lime/[0.12] via-lime/[0.04] to-transparent px-6 py-10 sm:px-10 sm:py-12">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-lime/20 bg-lime/[0.07] px-3.5 py-2 text-xs font-medium text-lime"><Mail size={14} /> Contact · خدمة المتعلمين</div>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">يسعدنا <span className="text-lime">نسمع منك.</span></h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/55">للاستفسار عن الدورات أو المساعدة في استخدام المنصة، تواصل معنا مباشرة عبر واتساب.</p>
          </section>
          <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <article className="rounded-2xl border border-white/[0.08] bg-panel p-6 sm:p-8">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#25D366]/10 text-[#55e889]"><MessageCircle size={24} /></span>
              <h2 className="mt-5 text-xl font-bold">تواصل عبر واتساب</h2>
              <p className="mt-2 text-sm leading-7 text-white/50">اضغط لفتح محادثة مباشرة. سنساعدك في أسئلتك عن البرمجة ولغات العالم والدورات.</p>
              <p className="mt-5 text-lg font-semibold tracking-wide text-white" dir="ltr">+20 120 584 5139</p>
              <p className="mt-1 text-xs text-white/40" dir="ltr">0120 584 5139</p>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3.5 text-sm font-bold text-[#092b16] transition hover:bg-[#55e889]"><MessageCircle size={17} /> ابدأ محادثة واتساب</a>
            </article>
            <article className="overflow-hidden rounded-2xl border border-white/[0.08] bg-panel">
              <div className="flex items-center gap-3 px-5 py-4"><span className="grid h-9 w-9 place-items-center rounded-lg bg-lime/10 text-lime"><MapPin size={17} /></span><div><h2 className="text-sm font-bold">خريطة عامة لمصر</h2><p className="mt-1 text-xs text-white/40">للتوضيح فقط — لا تمثل عنوانًا فعليًا للمكتب.</p></div></div>
              <iframe title="خريطة عامة لمصر" src="https://www.openstreetmap.org/export/embed.html?bbox=24.7%2C22%2C36.9%2C31.8&amp;layer=mapnik&amp;marker=26.8206%2C30.8025" className="h-[300px] w-full border-0 bg-[#e8e7e1] sm:h-[360px]" loading="lazy" referrerPolicy="no-referrer" />
              <a href="https://www.openstreetmap.org/?mlat=26.8206&amp;mlon=30.8025#map=5/26.8206/30.8025" target="_blank" rel="noreferrer" className="block border-t border-white/[0.07] px-5 py-3 text-xs font-semibold text-lime hover:underline">افتح الخريطة الكاملة</a>
            </article>
          </section>
        </div>}
      </main>
      <footer className="border-t border-white/[0.07] px-5 py-6 text-center text-xs text-white/35">كود · اتعلم النهارده، وابني بكرة.</footer>
    </div>
  )
}

function App() {
  const [activeCategory, setActiveCategory] = useState('الكل')
  const [query, setQuery] = useState('')
  const [saved, setSaved] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [activePage, setActivePage] = useState(() => {
    const page = window.location.pathname.replace(/^\/+|\/+$/g, '')
    return ['about', 'contact'].includes(page) ? page : 'home'
  })
  const [assistantOpen, setAssistantOpen] = useState(false)
  const [installOpen, setInstallOpen] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [started, setStarted] = useState([])

  useEffect(() => {
    const handleBeforeInstall = (event) => {
      event.preventDefault()
      setDeferredPrompt(event)
    }
    window.addEventListener('beforeinstallprompt', handleBeforeInstall)
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall)
  }, [])

  useEffect(() => {
    const syncPage = () => {
      const page = window.location.pathname.replace(/^\/+|\/+$/g, '')
      setActivePage(['about', 'contact'].includes(page) ? page : 'home')
      setSelectedCourse(null)
    }
    window.addEventListener('popstate', syncPage)
    return () => window.removeEventListener('popstate', syncPage)
  }, [])

  const filteredCourses = useMemo(() => courses.filter((course) => {
    const matchesCategory = activeCategory === 'الكل' || course.category === activeCategory
    const searchText = `${course.title} ${course.language} ${course.category}`.toLowerCase()
    return matchesCategory && searchText.includes(query.trim().toLowerCase())
  }), [activeCategory, query])

  const toggleSaved = (id) => setSaved((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  const startCourse = (id) => {
    setStarted((current) => current.includes(id) ? current : [...current, id])
  }
  const navigateTo = (page, section) => {
    setSelectedCourse(null)
    setActivePage(page)
    const destination = page === 'home' ? '/' : `/${page}`
    const hash = page === 'home' && section ? `#${section}` : ''
    if (`${window.location.pathname}${window.location.hash}` !== `${destination}${hash}`) {
      window.history.pushState({}, '', `${destination}${hash}`)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (page === 'home' && section) {
      window.setTimeout(() => document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' }), 50)
    }
  }
  const openCourse = (course) => {
    setSelectedCourse(course)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (selectedCourse) {
    return <>
      <CoursePage
        key={selectedCourse.id}
        course={selectedCourse}
        isStarted={started.includes(selectedCourse.id)}
        onStart={() => startCourse(selectedCourse.id)}
        onBack={() => setSelectedCourse(null)}
        onNavigate={navigateTo}
        onOpenAssistant={() => setAssistantOpen(true)}
        onInstallApp={() => setInstallOpen(true)}
      />
      {assistantOpen && <AssistantModal onClose={() => setAssistantOpen(false)} />}
      {installOpen && <InstallModal onClose={() => setInstallOpen(false)} deferredPrompt={deferredPrompt} />}
    </>
  }

  if (activePage !== 'home') {
    return <>
      <InfoPage
        page={activePage}
        onNavigate={navigateTo}
        onOpenAssistant={() => setAssistantOpen(true)}
        onInstallApp={() => setInstallOpen(true)}
      />
      {assistantOpen && <AssistantModal onClose={() => setAssistantOpen(false)} />}
      {installOpen && <InstallModal onClose={() => setInstallOpen(false)} deferredPrompt={deferredPrompt} />}
    </>
  }

  return (
    <div className="min-h-screen overflow-hidden bg-ink text-[#f4f3ef]">
      <SiteNavbar
        page="home"
        onNavigate={navigateTo}
        onOpenAssistant={() => setAssistantOpen(true)}
        onInstallApp={() => setInstallOpen(true)}
      />

      <main>
        <section className="relative">
          <div className="page-grid hero-glow pointer-events-none absolute inset-0" />
          <div className="relative mx-auto grid max-w-[1240px] items-center gap-10 px-5 pb-20 pt-16 md:min-h-[560px] md:grid-cols-[1.03fr_0.97fr] md:gap-8 md:pb-24 md:pt-20 lg:px-8">
            <div className="relative z-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-lime/20 bg-lime/[0.07] px-3.5 py-2 text-xs font-medium text-lime">
                <Sparkles size={14} /> مستقبلك يبدأ بسطر كود
              </div>
              <h1 className="max-w-[610px] text-[42px] font-bold leading-[1.35] tracking-tight sm:text-[54px] lg:text-[64px]">
                اتعلم البرمجة،<br />وابني <span className="relative inline-block text-lime">مستقبلك<svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 245 12" fill="none" aria-hidden="true"><path d="M3 8.5C66 2 157 1.5 241 6" stroke="#D3F36B" strokeWidth="4" strokeLinecap="round" /></svg></span> بطريقتك.
              </h1>
              <p className="mt-6 max-w-[470px] text-[16px] leading-8 text-white/55 md:text-[17px]">من أول سطر كود لأول مشروع حقيقي. اتعلم أكتر لغات البرمجة طلبًا مع خبراء بيشرحوا بلغتك.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#courses" className="inline-flex items-center justify-center gap-3 rounded-xl bg-lime px-6 py-3.5 text-sm font-bold text-ink transition hover:-translate-y-0.5 hover:bg-[#e2ff8c]">اكتشف الدورات <ArrowLeft size={17} /></a>
                <a href="#paths" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/[0.04]"><Play size={15} fill="currentColor" /> اعرف أكتر</a>
              </div>
              <div className="mt-10 flex items-center gap-4">
                <div className="flex -space-x-2 space-x-reverse">
                  {['أ', 'م', 'س', 'ع'].map((letter, index) => <span key={letter} className={`grid h-9 w-9 place-items-center rounded-full border-2 border-ink text-xs font-bold text-ink ${['bg-lime', 'bg-cyan-300', 'bg-violet-300', 'bg-orange-300'][index]}`}>{letter}</span>)}
                </div>
                <div><div className="flex items-center gap-1 text-xs text-amber-300"><Star size={12} fill="currentColor" /> <b className="text-white">4.9/5</b> <span className="text-white/45">من تقييمات الطلاب</span></div><p className="mt-1 text-xs text-white/40">انضم لأكتر من ٢٥,٠٠٠ متعلم</p></div>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[510px] md:mr-auto">
              <div className="absolute -inset-12 rounded-full bg-lime/[0.06] blur-3xl" />
              <div className="float-animation relative rounded-3xl border border-white/10 bg-[#191a17] p-4 shadow-2xl shadow-black/40 sm:p-5">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                  <div className="flex items-center gap-2.5"><span className="grid h-9 w-9 place-items-center rounded-xl bg-amber-300/10 font-bold text-amber-300">JS</span><div><p className="text-sm font-semibold">أول برنامج ليك</p><p className="mt-0.5 text-[11px] text-white/40">JavaScript للمبتدئين</p></div></div>
                  <span className="rounded-full bg-lime/10 px-2.5 py-1 text-[10px] font-semibold text-lime">الدرس ٣ من ١٨٨</span>
                </div>
                <div className="mt-4 rounded-2xl border border-white/[0.06] bg-[#111210] p-4 sm:p-5">
                  <div className="mb-5 flex items-center gap-2 text-xs text-white/40"><span className="h-2 w-2 rounded-full bg-red-400" /><span className="h-2 w-2 rounded-full bg-amber-300" /><span className="h-2 w-2 rounded-full bg-lime" /><span className="mr-auto font-mono">hello-world.js</span><Command size={14} /></div>
                  <div className="space-y-3 font-mono text-[13px] leading-5 sm:text-sm" dir="ltr">
                    <p><span className="text-violet-300">const</span> <span className="text-sky-200">dream</span> <span className="text-white/50">=</span> <span className="text-amber-200">"مطور المستقبل"</span><span className="text-white/50">;</span></p>
                    <p><span className="text-violet-300">function</span> <span className="text-lime">startJourney</span><span className="text-white/60">() {'{'}</span></p>
                    <p className="pr-5"><span className="text-sky-200">console</span><span className="text-white/50">.</span><span className="text-lime">log</span><span className="text-white/60">(</span><span className="text-amber-200">`أهلًا بيك يا ${'{dream}'}`</span><span className="text-white/60">);</span></p>
                    <p className="text-white/60">{'}'}</p>
                    <p><span className="text-lime">startJourney</span><span className="text-white/60">();</span><span className="float-animation mr-1 inline-block h-4 w-[2px] translate-y-0.5 bg-lime" /></p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-white/45"><span className="grid h-7 w-7 place-items-center rounded-full bg-white/10 text-[10px] text-white">م</span> مريم خالد <span className="text-white/20">·</span> ١٢ دقيقة</div>
                  <button onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })} className="grid h-9 w-9 place-items-center rounded-full bg-lime text-ink transition hover:scale-105" aria-label="استكشف الدورات"><ArrowUpLeft size={17} /></button>
                </div>
              </div>
              <div className="absolute -right-5 top-12 hidden items-center gap-2 rounded-xl border border-white/10 bg-[#20211d] px-3 py-2.5 shadow-xl sm:flex"><span className="grid h-8 w-8 place-items-center rounded-lg bg-lime/10 text-lime"><Check size={16} /></span><div><p className="text-[11px] font-semibold">أحسنت!</p><p className="text-[10px] text-white/40">أنهيت أول تحدي</p></div></div>
              <div className="absolute -bottom-5 left-1 hidden items-center gap-2 rounded-xl border border-white/10 bg-[#20211d] px-3 py-2.5 shadow-xl sm:flex"><Flame size={17} className="text-orange-300" /><p className="text-xs font-semibold">٣ أيام <span className="font-normal text-white/45">متتالية من التعلم</span></p></div>
            </div>
          </div>
        </section>

        <section id="paths" className="border-y border-white/[0.07] bg-[#141413]">
          <div className="mx-auto max-w-[1240px] px-5 py-7 lg:px-8">
            <div className="mb-4"><p className="text-xs font-semibold text-white/40">ابدأ باللغة اللي تهمك</p><p className="mt-1 text-sm font-semibold">مسارات برمجية لكل طموح</p></div>
            <SliderRail label="لغات البرمجة" autoPlay autoPlayInterval={3000}>
              {topics.map((topic) => <button key={topic.name} dir="rtl" onClick={() => { setQuery(topic.name); document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' }) }} className="flex min-w-max snap-start items-center gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3.5 py-2.5 transition hover:border-lime/30 hover:bg-lime/[0.04]"><span className={`grid h-8 w-8 place-items-center rounded-lg text-xs font-bold ${topic.bg} ${topic.color}`}>{topic.symbol}</span><span className="text-xs font-medium text-white/75">{topic.label}</span><ArrowUpLeft size={13} className="text-white/25" /></button>)}
            </SliderRail>
          </div>
        </section>

        <section id="world-languages" className="border-b border-white/[0.07] bg-[#141413]">
          <div className="mx-auto max-w-[1240px] px-5 py-10 lg:px-8">
            <div className="mb-1 flex items-center gap-2 text-xs font-semibold text-lime"><Sparkles size={14} /> تعلّم لغة جديدة</div>
            <h2 className="mb-1 text-xl font-bold">لغات العالم في ٥٠٠ درس</h2>
            <p className="mb-4 text-xs leading-6 text-white/45">اختر الإنجليزية أو الإسبانية أو الفرنسية أو الألمانية أو الإيطالية. كل مسار مقسّم إلى مبتدئ ومتوسط ومتقدم.</p>
            <SliderRail label="دورات اللغات العالمية" autoPlay autoPlayInterval={3800}>
              {courses.filter((course) => course.courseType === 'world-language').map((course) => <article key={course.id} dir="rtl" className={`w-[min(82vw,300px)] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br ${course.color}`}>
                <div className="flex items-center gap-3 p-4">
                  <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-white/10 bg-[#151613]/75 font-mono text-sm font-bold ${course.iconColor}`}>{course.icon}</span>
                  <div className="min-w-0"><p className="text-[11px] text-white/55">{course.language} · ٥٠٠ درس</p><h3 className="mt-1 text-sm font-bold">{course.title}</h3></div>
                </div>
                <div className="flex items-center justify-between border-t border-white/[0.08] px-4 py-3">
                  <span className="text-[10px] text-white/50">مبتدئ · متوسط · متقدم</span>
                  <button onClick={() => openCourse(course)} className="flex items-center gap-1 text-xs font-bold text-lime hover:gap-2">ابدأ التعلم <ArrowLeft size={13} /></button>
                </div>
              </article>)}
            </SliderRail>
          </div>
        </section>

        <section id="courses" className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div><div className="mb-3 flex items-center gap-2 text-xs font-semibold text-lime"><span className="h-px w-6 bg-lime" /> مكتبة الدورات</div><h2 className="text-3xl font-bold tracking-tight sm:text-[38px]">كود واحد يفرق <span className="text-white/35">في مستقبلك.</span></h2><p className="mt-3 text-sm text-white/45">دورات عملية بتبدأ معاك من الأساسيات لحد أول مشروع ليك.</p></div>
            <div className="relative w-full md:max-w-[290px]"><Search className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/35" size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="دور على لغة أو دورة..." className="w-full rounded-xl border border-white/10 bg-white/[0.035] py-3 pr-10 pl-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-lime/50" aria-label="البحث عن الدورات" />{query && <button onClick={() => setQuery('')} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white" aria-label="مسح البحث"><X size={15} /></button>}</div>
          </div>
          <div className="scrollbar-hide mt-8 flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => <button key={category} onClick={() => setActiveCategory(category)} className={`shrink-0 rounded-lg px-4 py-2 text-xs font-semibold transition ${activeCategory === category ? 'bg-lime text-ink' : 'border border-white/[0.08] text-white/50 hover:border-white/20 hover:text-white/80'}`}>{category}</button>)}
          </div>
          {filteredCourses.length > 0 ? <SliderRail className="mt-5" label="الدورات المتاحة" autoPlay autoPlayInterval={4400}>
            {filteredCourses.map((course) => <article key={course.id} dir="rtl" className="group w-[min(85vw,360px)] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/[0.08] bg-panel transition duration-300 hover:-translate-y-1 hover:border-white/15">
              <div className={`relative flex h-[155px] items-center justify-center bg-gradient-to-br ${course.color}`}>
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,.16) 1px, transparent 0)', backgroundSize: '19px 19px' }} />
                <span className={`relative grid h-[72px] w-[72px] place-items-center rounded-[22px] border border-white/10 bg-[#151613]/80 font-mono text-2xl font-bold shadow-2xl transition duration-300 group-hover:scale-110 ${course.iconColor}`}>{course.icon}</span>
                <span className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/25 px-2.5 py-1 text-[10px] font-semibold text-white/70">{course.level}</span>
                {course.featured && <span className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-lime px-2.5 py-1 text-[10px] font-bold text-ink"><Flame size={11} /> الأكثر طلبًا</span>}
                <button onClick={() => toggleSaved(course.id)} className={`absolute bottom-3 left-3 grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-black/30 transition hover:bg-black/60 ${saved.includes(course.id) ? 'text-lime' : 'text-white/55'}`} aria-label={saved.includes(course.id) ? 'إزالة من المحفوظات' : 'حفظ الدورة'}><Bookmark size={15} fill={saved.includes(course.id) ? 'currentColor' : 'none'} /></button>
              </div>
              <div className="p-5">
                <p className="text-[11px] font-semibold text-lime">{course.language}<span className="px-1.5 text-white/20">/</span><span className="font-normal text-white/40">{course.category}</span></p>
                <button onClick={() => openCourse(course)} className="mt-2.5 text-right text-[16px] font-bold leading-7 transition hover:text-lime">{course.title}</button>
                <div className="mt-3 flex items-center gap-1 text-[11px] text-white/40"><span className="grid h-5 w-5 place-items-center rounded-full bg-white/10 text-[9px] text-white">{course.teacher.slice(0, 1)}</span><span className="mr-1">{course.teacher}</span><span className="mx-1 text-white/20">·</span><Star size={12} className="text-amber-300" fill="currentColor" /><span className="text-white/70">{course.rating}</span><span className="mr-auto">{course.students} طالب</span></div>
                <div className="mt-4 flex items-center justify-between border-t border-white/[0.07] pt-4 text-[11px] text-white/40"><span className="flex items-center gap-1.5"><Play size={12} /> {course.lessons} درس</span><span>{course.hours}</span><button onClick={() => openCourse(course)} className="flex items-center gap-1 font-semibold text-lime transition hover:gap-2">افتح المسار <ArrowLeft size={13} /></button></div>
                {started.includes(course.id) && <p className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-lime"><Check size={13} /> اتضافت لقائمة تعلمك</p>}
              </div>
            </article>)}
          </SliderRail> : <div className="mt-5 rounded-2xl border border-dashed border-white/10 py-16 text-center"><Search size={25} className="mx-auto text-white/25" /><p className="mt-3 text-sm font-semibold">مفيش دورات مطابقة لبحثك</p><button onClick={() => { setQuery(''); setActiveCategory('الكل') }} className="mt-2 text-xs text-lime hover:underline">امسح البحث والفلاتر</button></div>}
          <div className="mt-10 text-center"><button onClick={() => { setActiveCategory('الكل'); setQuery('') }} className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-xs font-semibold text-white/70 transition hover:border-lime/40 hover:text-lime">استكشف كل الدورات <ArrowLeft size={14} /></button></div>
        </section>

      </main>

      <footer className="border-t border-white/[0.07]">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-4 px-5 py-6 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <a href="#" className="flex items-center gap-2 text-sm font-bold text-white/75"><span className="grid h-7 w-7 place-items-center rounded-lg bg-lime text-ink"><Code2 size={15} /></span> كود<span className="text-lime">.</span></a>
          <p>اتعلم النهارده، وابني بكرة. © ٢٠٢٥ كود</p>
          <div className="flex gap-5"><button onClick={() => navigateTo('about')} className="transition hover:text-white/70">About</button><button onClick={() => navigateTo('contact')} className="transition hover:text-white/70">Contact</button><button onClick={() => navigateTo('home', 'courses')} className="transition hover:text-white/70">الدورات</button></div>
        </div>
      </footer>

      {assistantOpen && <AssistantModal onClose={() => setAssistantOpen(false)} />}
      {installOpen && <InstallModal onClose={() => setInstallOpen(false)} deferredPrompt={deferredPrompt} />}
    </div>
  )
}

export default App
