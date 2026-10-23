/**
 * مساعد كود الذكي المدمج (Smart In-App AI Knowledge Engine)
 * يقدم إجابات ذكية وتفصيلية وأمثلة كود عملية لجميع لغات البرمجة الـ 30 ولغات العالم
 * يعمل فورياً ومحلياً لضمان عدم توقف المساعد وبدون أي أخطاء حتى في حال عدم وجود اتصال أو مفتاح خادم.
 */

export const topicKnowledge = {
  javascript: {
    name: 'JavaScript',
    category: 'تطوير الويب والواجهات التفاعلية',
    summary: 'لغة البرمجة الأكثر انتشارًا في العالم، والأساس التفاعلي لصفحات الويب وتطبيقات السيرفر عبر Node.js.',
    concepts: [
      '**المتغيرات:** استخدم `const` افتراضيًا للثوابت، و `let` إذا كانت القيمة ستتغير، وتجنب `var` القديمة لتفادي مشاكل النطاق (Scope).',
      '**البرمجة غير المتزامنة:** التعامل مع الوعود عبر `async / await` يمنحك كودًا سهل القراءة والتتبع مقارنة بـ Callbacks.',
      '**دوال المصفوفات الحديثة:** اعتمد على `map`، `filter`، و `reduce` لمعالجة البيانات بأسلوب وظيفي أنيق.',
      '**الـ Closures (الإغلاقات):** قدرة الدالة على تذكر نطاقها الخارجي حتى بعد انتهاء تنفيذه، وهي أساس الدوال المعيارية والتغليف.',
    ],
    example: `// مثال عملي: جلب بيانات وفلترتها ومعالجتها بأسلوب عصري
async function getActiveStudents(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data
      .filter(item => item.isActive)
      .map(item => ({ id: item.id, name: item.name.trim() }));
  } catch (err) {
    console.error('حدث خطأ أثناء جلب البيانات:', err);
    return [];
  }
}`,
    tips: 'ابدأ دائمًا بفهم أساسيات Vanilla JavaScript (الـ DOM والأحداث والأنواع) جيدًا قبل الانتقال إلى أطر العمل كـ React أو Vue.',
  },

  react: {
    name: 'React',
    category: 'واجهات المستخدم العصرية',
    summary: 'المكتبة الأكثر طلبًا في العالم لبناء واجهات مستخدم تفاعلية معيارية تعتمد على المكونات (Components).',
    concepts: [
      '**المكونات (Components):** دوال جافاسكريبت تُرجع كود JSX يمثل جزءًا مستقلاً وقابلاً لإعادة الاستخدام من الواجهة.',
      '**الحالة (State):** يتم التحكم فيها عبر الخطاف `useState`، وتحديثها هو ما يحفز React لإعادة تصيير العنصر (Re-render).',
      '**الآثار الجانبية (useEffect):** تنفيذ العمليات المرتبطة بالعالم الخارجي مثل طلبات الـ API والاشتراكات والمؤقتات.',
      '**الـ Virtual DOM:** تقنية ذكية تقارن التغييرات في الذاكرة لتحديث العناصر المتغيرة فقط في المتصفح بكفاءة عالية.',
    ],
    example: `import { useState, useEffect } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`العدد الحالي: \${count}\`;
  }, [count]);

  return (
    <div className="p-4 rounded-xl bg-panel">
      <p>النقرات: {count}</p>
      <button onClick={() => setCount(prev => prev + 1)}>
        زيادة +
      </button>
    </div>
  );
}`,
    tips: 'تذكر قاعدة الـ Key الفريدة عند عرض القوائم، ولا تعدل المتغيرات مباشرة بل استخدم دائمًا دالة التحديث المخصصة.',
  },

  python: {
    name: 'Python',
    category: 'الذكاء الاصطناعي وتحليل البيانات',
    summary: 'لغة سهلة القراءة كالإنجليزية وقوية للغاية، الخيار الأول عالمياً في مجالات الذكاء الاصطناعي، علم البيانات، والأتمتة.',
    concepts: [
      '**البساطة:** لا حاجة للأقواس المعقوفة أو الفواصل المنقوطة، الاعتماد كله على المسافات البادئة (Indentation).',
      '**القوائم والقواميس:** هياكل بيانات غنية وسريعة مثل \`[1, 2, 3]\` و \`{"name": "عمر", "role": "مطور"}\`.',
      '**الـ List Comprehension:** اختصار الحلقات في سطر واحد مقروء: \`[x * 2 for x in nums if x > 0]\`.',
      '**المكتبات العملاقة:** مكتبات لا غنى عنها مثل NumPy و Pandas للبيانات، و PyTorch و TensorFlow للذكاء الاصطناعي.',
    ],
    example: `# مثال عملي: قراءة أرقام وحساب المتوسط وتحليلها بأسلوب بايثون الأنيق
numbers = [12, 45, 68, 23, 89, 90]

# توليد قائمة بمربعات الأعداد الزوجية في سطر واحد
even_squares = [n ** 2 for n in numbers if n % 2 == 0]

average = sum(numbers) / len(numbers)
print(f"المتوسط الحسابي: {average:.2f}")
print(f"مربعات الأعداد الزوجية: {even_squares}")`,
    tips: 'إذا كنت مبتدئًا في عالم البرمجة، بايثون هي البوابة المثالية لتعلم المنطق والخوارزميات دون التشتت في تفاصيل الذاكرة المعقدة.',
  },

  flutter: {
    name: 'Flutter',
    category: 'تطبيقات الموبايل الهجينة',
    summary: 'إطار عمل Google الرائد لبناء تطبيقات مذهلة وسريعة للهواتف (Android & iOS) والويب من كود Dart واحد.',
    concepts: [
      '**كل شيء ويدجت (Everything is a Widget):** الشاشات، الأزرار، النصوص، الحواشي، وحتى التنسيقات هي Widgets.',
      '**Stateless vs StatefulWidget:** الأول ثابت لا يتغير، بينما الثاني يمتلك حالة ديناميكية تتحدث عبر \`setState()\`.',
      '**Hot Reload:** ميزة توفر ثوانٍ معدودة لمعاينة تعديلاتك فورًا على الهاتف دون فقدان حالة التطبيق.',
      '**Dart Null Safety:** حماية مدمجة في اللغة تمنع انهيار التطبيق بسبب القيم الفارغة (Null).',
    ],
    example: `import 'package:flutter/material.dart';

class WelcomeCard extends StatelessWidget {
  final String title;
  const WelcomeCard({super.key, required this.title});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        leading: const Icon(Icons.code, color: Colors.lime),
        title: Text(title),
        subtitle: const Text('ابدأ مسار فلاتر اليوم'),
      ),
    );
  }
}`,
    tips: 'ركز على فهم بنية الشاشات باستخدام Scaffold، وقم بتنظيم مشروعك بفصل الشاشات عن منطق البيانات والـ State.',
  },

  sql: {
    name: 'SQL',
    category: 'قواعد البيانات العلائقية',
    summary: 'لغة الاستعلامات المعيارية الأهم في العالم للتعامل مع قواعد البيانات العلائقية (RDBMS) وإدارة البيانات الضخمة.',
    concepts: [
      '**استرجاع البيانات:** الأساس يبدأ مع \`SELECT عمود FROM جدول WHERE شرط\`.',
      '**الربط (JOINs):** دمج البيانات من عدة جداول عبر \`INNER JOIN\` (المتطابق) و \`LEFT JOIN\` (كل الأيسر مع مطابق الأيمن).',
      '**التجميع والفرز:** استخدام \`GROUP BY\` مع دوال مثل \`COUNT()\`, \`SUM()\`, \`AVG()\` ثم التصفية بـ \`HAVING\`.',
      '**المفاتيح والفهارس:** \`Primary Key\` لتمييز الصف، و \`Indexes\` لتسريع عمليات البحث آلاف المرات.',
    ],
    example: `-- استعلام يسترجع الطلاب المتميزين مع تفاصيل دوراتهم
SELECT 
    s.id,
    s.name,
    COUNT(c.id) AS completed_courses
FROM students s
INNER JOIN enrollments e ON s.id = e.student_id
INNER JOIN courses c ON e.course_id = c.id
WHERE e.status = 'completed'
GROUP BY s.id, s.name
HAVING COUNT(c.id) >= 3
ORDER BY completed_courses DESC;`,
    tips: 'احرص دائمًا على وضع فهارس (Indexes) على الأعمدة التي تبحث بها بكثرة في جملة WHERE، وتجنب استخدام SELECT * في بيئة الإنتاج.',
  },

  java: {
    name: 'Java',
    category: 'تطبيقات المؤسسات والأنظمة الكبيرة',
    summary: 'لغة كائنية شهيرة (OOP) قوية، تعمل على مليارات الأجهزة عبر آلة Java الافتراضية (JVM)، وهي ركيزة الخدمات المصرفية والخوادم الضخمة.',
    concepts: [
      '**البرمجة كائنية التوجه (OOP):** كل كود يكتب داخل فئات (Classes)، مع تطبيق التغليف والوراثة وتعدد الأشكال.',
      '**التحقق الصارم من الأنواع (Static Typing):** يمنع الكثير من الأخطاء المنطقية قبل وقت التشغيل.',
      '**إدارة الذاكرة الآلية (Garbage Collector):** ينظف الذاكرة تلقائيًا ويتخلص من الكائنات غير المستخدمة.',
      '**منظومة Spring Boot:** الإطار الأكثر انتشارًا لبناء الـ Microservices وواجهات برمجة التطبيقات للمؤسسات.',
    ],
    example: `public class Course {
    private String title;
    private int lessons;

    public Course(String title, int lessons) {
        this.title = title;
        this.lessons = lessons;
    }

    public void displayInfo() {
        System.out.println("دورة: " + title + " (" + lessons + " درس)");
    }

    public static void main(String[] args) {
        Course myCourse = new Course("Java للمطورين", 39);
        myCourse.displayInfo();
    }
}`,
    tips: 'احرص على فهم مبادئ SOLID وتطبيقها في Java، وتعلم مكتبة Stream API لتبسيط العمليات على القوائم.',
  },

  typescript: {
    name: 'TypeScript',
    category: 'تطوير الويب عالي الاعتمادية',
    summary: 'امتداد فائق القوة لـ JavaScript يضيف نظام أنواع صارم (Static Typing) يكتشف الأخطاء البرمجية أثناء الكتابة ويوفر إكمالًا تلقائيًا مذهلاً.',
    concepts: [
      '**الواجهات والأنواع (Interfaces & Types):** توصيف دقيق لشكل البيانات والمكونات لمنع تمرير خصائص مجهولة.',
      '**الأنواع العامة (Generics):** كتابة دوال ومكونات مرنة تعمل مع أي نوع من البيانات مع الحفاظ على أمان النوع.',
      '**الأمان من القيم الفارغة (Strict Null Checks):** منع أشهر خطأ في الويب: `cannot read property of undefined`.',
      '**التوافق التام:** كل كود JavaScript صالح هو كود TypeScript صالح ويترجم في النهاية إلى JS نقي.',
    ],
    example: `interface Student {
  id: number;
  name: string;
  enrolledCourse?: string;
}

function getWelcomeMessage<T extends Student>(student: T): string {
  return \`أهلاً بك يا \${student.name}! \${student.enrolledCourse ? 'دورتك: ' + student.enrolledCourse : ''}\`;
}

const user: Student = { id: 101, name: 'سارة', enrolledCourse: 'TypeScript' };
console.log(getWelcomeMessage(user));`,
    tips: 'تجنب استخدام النوع `any` قدر المستطاع؛ فهو يلغي فائدة TypeScript الرئيسية. استخدم `unknown` إذا لم تكن متأكدًا من النوع.',
  },

  cpp: {
    name: 'C++',
    category: 'برمجة النظم والأداء الفائق',
    summary: 'لغة القوة والسرعة القصوى، أساس أنظمة التشغيل، محركات الألعاب (Unreal Engine)، المتصفحات، والروبوتات والأنظمة المدمجة.',
    concepts: [
      '**التحكم المباشر في الذاكرة:** استخدام المؤشرات `*` والمراجع `&` للوصول المباشر إلى عناوين الذاكرة دون وسيط.',
      '**المؤشرات الذكية (Smart Pointers):** تجنب `new / delete` اليدوية واستبدالها بـ `std::unique_ptr` و `std::shared_ptr`.',
      '**مكتبة القوالب (STL):** حاويات جاهزة عالية الكفاءة مثل `std::vector`, `std::unordered_map` وخوارزميات الفرز السريعة.',
      '**الأداء الآلي النقي:** تترجم C++ إلى كود آلي مباشر (Native Code) بدون مفسر أو جامع قمامة يعطل المعالجة.',
    ],
    example: `#include <iostream>
#include <vector>
#include <memory>

class StudentRecord {
public:
    std::string name;
    explicit StudentRecord(std::string n) : name(std::move(n)) {}
    void print() const { std::cout << "طالب: " << name << "\\n"; }
};

int main() {
    auto student = std::make_unique<StudentRecord>("محمود");
    student->print();
    return 0;
}`,
    tips: 'إذا أردت فهم كيف يعمل المعالج والذاكرة حقًا في الكواليس، فإن دراسة C++ ستجعلك مهندس برمجيات محترف في أي لغة أخرى.',
  },

  html: {
    name: 'HTML5',
    category: 'هيكل الويب الأساسي',
    summary: 'لغة ترميز النص الفائق التي تشكل الهيكل والعمود الفقري لأي صفحة وموقع على شبكة الإنترنت.',
    concepts: [
      '**العناصر الدلالية (Semantic HTML):** استخدام `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>` لتحسين محركات البحث SEO وقارئات الشاشة.',
      '**النماذج والمدخلات (Forms):** حقول الإدخال مع التحقق التلقائي مثل `type="email"`, `required`, `pattern`.',
      '**الوسائط المتعددة:** تضمين الفيديو والصوت والرسوميات بالوسوم الأصلية `<video>`, `<audio>`, `<canvas>`, `<svg>`.',
      '**قابلية الوصول (Accessibility - a11y):** استخدام سمات `aria-*` والوصف البديل `alt` لتسهيل الاستخدام لذوي الاحتياجات.',
    ],
    example: `<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="utf-8">
    <title>منصة كود التعليمية</title>
  </head>
  <body>
    <header>
      <nav aria-label="الرئيسية"><a href="/">كود</a></nav>
    </header>
    <main>
      <h1>ابدأ تعلم البرمجة</h1>
      <p>أكثر من 30 مسارًا برمجياً مجاناً.</p>
    </main>
  </body>
</html>`,
    tips: 'اكتب دائمًا كود HTML دلالي ونظيف وتجنب الإفراط في استخدام وسوم `<div>` بدون فائدة هيكلية.',
  },

  css: {
    name: 'CSS3',
    category: 'تصميم وتنسيق الواجهات',
    summary: 'لغة تصميم الويب المسؤولة عن الألوان، الخطوط، التخطيطات المرنة، الحركات التفاعلية، والتصميم المتجاوب مع جميع الشاشات.',
    concepts: [
      '**Flexbox:** التخطيط أحادي البعد للمحاذاة الرأسية والأفقية وتوزيع المساحات بين العناصر.',
      '**CSS Grid:** التخطيط ثنائي الأبعاد لبناء شبكات وتخطيطات صفحات معقدة بأقل أسطر كود.',
      '**التصميم المتجاوب (Responsive):** استخدام Media Queries ومقاييس مرنة مثل `rem`, `ch`, `clamp()` لتلائم الهواتف والشاشات الكبيرة.',
      '**المتغيرات والتحريك:** تعريف `--primary-color` وتطبيق `transition` و `@keyframes` لإضفاء الحيوية على الموقع.',
    ],
    example: `.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.card {
  background: #181916;
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  border-color: #d3f36b;
}`,
    tips: 'اعتمد على Box-sizing: border-box كقاعدة عامة في مشروعك، وتعلم نظام Flexbox جيدًا فهو يحل 80% من مشاكل التنسيق.',
  },

  php: {
    name: 'PHP',
    category: 'تطوير خوادم الويب (Backend)',
    summary: 'لغة خوادم الويب الكلاسيكية والحديثة التي تشغل أكثر من 75% من مواقع الإنترنت، والعمود الفقري لأنظمة WordPress وإطار عمل Laravel العملاق.',
    concepts: [
      '**المعالجة من طرف الخادم (Server-side):** تنفيذ الكود على السيرفر وإرجاع HTML أو JSON إلى المتصفح.',
      '**التعامل مع قواعد البيانات:** الاتصال الآمن عبر مكتبة PDO واستخدام Prepared Statements لمنع هجمات SQL Injection.',
      '**ميزات PHP 8 الحديثة:** دعم الأنواع المحددة (Type Declarations)، الخصائص في البناء (Constructor Promotion)، ومطابقة الأنماط (Match).',
      '**إطار عمل Laravel:** الإطار الأكثر أناقة وإنتاجية لبناء مواقع ومتاجر إلكترونية متكاملة مع الـ ORM والـ Authentication.',
    ],
    example: `<?php
// مثال عملي بلغة PHP 8 الحديثة
class CourseService {
    public function __construct(private PDO $db) {}

    public function getActiveCourses(): array {
        $stmt = $this->db->prepare("SELECT id, title, lessons FROM courses WHERE status = :status");
        $stmt->execute(['status' => 'published']);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}

header('Content-Type: application/json; charset=utf-8');
echo json_encode(["status" => "success", "message" => "أهلاً بك في خادم PHP"]);
?>`,
    tips: 'استخدم دائمًا إصدارات PHP 8.x الحديثة واعتمد على مدير الحزم Composer لإدارة مكتباتك ومشاريعك.',
  },

  mongodb: {
    name: 'MongoDB',
    category: 'قواعد البيانات المستندية (NoSQL)',
    summary: 'قاعدة البيانات المستندية الرائدة عالمياً؛ تخزن البيانات في وثائق BSON مرنة شبيهة بـ JSON، مثالية للبيانات المتغيرة بسرعة وتطبيقات الـ MERN Stack.',
    concepts: [
      '**الوثائق والمجموعات (Documents & Collections):** تخزين كل سجل كمستند مستقل داخل مجموعة، دون قيود الجداول الصلبة.',
      '**المرونة (Schemaless):** إمكانية احتواء المستندات داخل نفس المجموعة على حقول مختلفة حسب الحاجة.',
      '**خطوط التجميع (Aggregation Pipeline):** معالجة وتصفية وتجميع البيانات بمراحل متسلسلة مثل `$match`, `$group`, `$sort`.',
      '**الفهارس (Indexes):** تسريع البحث عبر الفهارس الأحادية والمركبة وفهارس النصوص.',
    ],
    example: `// إضافة والبحث في مجموعة الطلاب عبر MongoDB Shell أو Mongoose
db.students.insertOne({
  name: "نورهان",
  courses: ["JavaScript", "React"],
  level: "متوسط",
  enrolledAt: new Date()
});

// البحث عن الطلاب المشتركين في دورة React
db.students.find({
  courses: "React"
}).sort({ enrolledAt: -1 }).limit(10);`,
    tips: 'رغم مرونة MongoDB، خطط لشكل بياناتك جيدًا واعرف متى تدمج البيانات (Embedding) ومتى تشير إليها بالمعرفات (Referencing).',
  },

  kotlin: {
    name: 'Kotlin',
    category: 'تطبيقات الأندرويد والأنظمة الحديثة',
    summary: 'اللغة الرسمية والمفضلة الأولى من Google لتطوير تطبيقات Android؛ تمتاز بالأناقة، الإيجاز، ومنع الأخطاء الصفرية (Null Safety).',
    concepts: [
      '**الأمان من الـ Null (Null Safety):** تمييز المتغيرات التي تقبل قيمة فارغة `String?` عن تلك المؤكدة `String` في وقت الترجمة.',
      '**الـ Coroutines:** أسلوب فائق الخفة لإدارة المهام غير المتزامنة والاتصال بالإنترنت دون تجميد شاشة المستخدم.',
      '**الـ Data Classes:** إنشاء فئات كاملة مع `toString`, `equals`, `copy` في سطر واحد: `data class User(val id: Int, val name: String)`.',
      '**التوافق الكامل:** تعمل جنبًا إلى جنب مع Java بنسبة 100% داخل نفس المشروع.',
    ],
    example: `// كلاس بيانات ودالة فلترة في Kotlin
data class Student(val id: Int, val name: String, val points: Int)

fun main() {
    val students = listOf(
        Student(1, "أحمد", 95),
        Student(2, "ليلى", 78),
        Student(3, "عمر", 88)
    )

    val topStudents = students.filter { it.points >= 80 }
    topStudents.forEach { println("متميز: \${it.name} (\${it.points} نقطة)") }
}`,
    tips: 'إذا كنت تطور لأندرويد، استثمر في تعلم Jetpack Compose مع Kotlin لبناء واجهات التطبيقات بالكامل برمجياً بأسلوب تعريفي عصري.',
  },

  go: {
    name: 'Go (Golang)',
    category: 'الخدمات السحابية والأنظمة فائقة السرعة',
    summary: 'لغة شركة Google المصممة للسرعة الفائقة، التزامن العالي (Concurrency)، والخدمات المصغرة (Microservices) وأدوات السحابة كـ Docker و Kubernetes.',
    concepts: [
      '**الـ Goroutines:** خيوط تنفيذ فائقة الخفة (تستهلك بضعة كيلوبايت فقط من الذاكرة) تتيح تشغيل مئات الآلاف من العمليات المتزامنة.',
      '**القنوات (Channels):** أسلوب آمن وأنيق لتبادل البيانات بين الـ Goroutines دون الحاجة لأقفال الذاكرة المعقدة (Locks).',
      '**سرعة الترجمة:** تُترجم إلى ملف تنفيذي ثنائي واحد (Single Binary) سريع التشغيل وبدون أي اعتمادات خارجية.',
      '**البساطة:** لغة خالية من التعقيدات الزائدة، لا تحتوي على وراثة فئات معقدة بل تعتمد على التكوين (Composition) والـ Interfaces.',
    ],
    example: `package main

import (
	"fmt"
	"net/http"
	"time"
)

func fetchStatus(url string, ch chan<- string) {
	resp, err := http.Get(url)
	if err != nil {
		ch <- fmt.Sprintf("فشل الاتصال بـ %s", url)
		return
	}
	ch <- fmt.Sprintf("%s يعمل بحالة: %s", url, resp.Status)
}

func main() {
	ch := make(chan string)
	urls := []string{"https://google.com", "https://github.com"}

	for _, u := range urls {
		go fetchStatus(u, ch) // تشغيل متزامن في Goroutine
	}

	for range urls {
		fmt.Println(<-ch)
	}
}`,
    tips: 'فلسفة Go تقوم على البساطة والمباشرة؛ لا تبحث عن حيل معقدة، واعتمد على معالجة الأخطاء الصريحة عبر التحقق من `if err != nil`.',
  },

  swift: {
    name: 'Swift',
    category: 'تطبيقات Apple (iOS / macOS)',
    summary: 'لغة شركة Apple الحديثة، السريعة، والآمنة لتطوير تطبيقات iPhone، iPad، Mac، Apple Watch، وتلفزيون Apple عبر إطار SwiftUI.',
    concepts: [
      '**SwiftUI:** إطار عمل تعريفي لبناء واجهات مذهلة تتحدث تلقائيًا مع تغير البيانات.',
      '**الـ Optionals:** نظام حماية صارم يجبر المطور على فحص وجود القيمة قبل استخدامها، لمنع انهيار التطبيق (Crash).',
      '**أمان النوع وسرعة الأداء:** أسرع بعدة أضعاف من Objective-C وتستفيد من كامل عتاد معالجات Apple Silicon.',
      '**البروتوكولات (Protocols):** البرمجة القائمة على البروتوكولات تمنح مرونة عالية في تصميم بنية التطبيق.',
    ],
    example: `import SwiftUI

struct GreetingView: View {
    @State private var name = "سارة"
    @State private var likes = 0

    var body: some View {
        VStack(spacing: 12) {
            Text("مرحباً بك يا \\(name) في عالم Swift")
                .font(.headline)
            Button("تسجيل إعجاب: \\(likes)") {
                likes += 1
            }
            .buttonStyle(.borderedProminent)
            .tint(.green)
        }
        .padding()
    }
}`,
    tips: 'ركز على إتقان SwiftUI و Combine أو الميزات الحديثة مثل Swift Concurrency (async/await) لبناء تطبيقات iOS احترافية.',
  },

  csharp: {
    name: 'C# (.NET)',
    category: 'منصة .NET وتطوير الألعاب والويب',
    summary: 'لغة شركة Microsoft الجبارة؛ متعددة الاستخدامات وتستخدم في بناء مواقع الويب بـ ASP.NET، برامج سطح المكتب، ومحرك الألعاب العالمي Unity.',
    concepts: [
      '**منصة .NET الحديثة:** بيئة عمل عابرة للمنصات (Cross-platform) تعمل بسرعة فائقة على Windows و Linux و Mac.',
      '**استعلامات LINQ:** كتابة استعلامات شبيهة بـ SQL مباشرة على المصفوفات والقوائم البرمجية لفلترتها وتجميعها.',
      '**محرك الألعاب Unity:** لغة البرمجة الأساسية لكتابة منطق الألعاب ثلاثية وثنائية الأبعاد في Unity.',
      '**البرمجة غير المتزامنة (async/await):** تسهل كتابة خدمات الويب السريعة التي تتحمل آلاف الطلبات بالثانية.',
    ],
    example: `using System;
using System.Collections.Generic;
using System.Linq;

class Program {
    static void Main() {
        var scores = new List<int> { 85, 92, 45, 76, 99, 63 };

        // استخدام LINQ لتصفية وترتيب الدرجات
        var topScores = scores
            .Where(s => s >= 75)
            .OrderByDescending(s => s);

        Console.WriteLine("الدرجات المتفوقة: " + string.Join(", ", topScores));
    }
}`,
    tips: 'تعلم C# مع ASP.NET Core يمنحك فرص عمل ممتازة في كبرى الشركات والمؤسسات التي تعتمد على خوادم مايكروسوفت والسحابة (Azure).',
  },

  ruby: {
    name: 'Ruby',
    category: 'تطوير الويب الرشيق وتطبيقات الشركات الناشئة',
    summary: 'لغة تم تصميمها لإسعاد المبرمج وأناقة الكود وبساطته، مشهورة بإطار العمل الثوري Ruby on Rails الذي بُنيت به منصات كـ GitHub و Shopify.',
    concepts: [
      '**كل شيء كائن (Everything is an Object):** حتى الأرقام والنصوص البسيطة هي كائنات تمتلك دوال جاهزة.',
      '**الكتل البرمجية (Blocks & Iterators):** أسلوب أنيق للتكرار مثل `5.times { puts "كود" }`.',
      '**Convention over Configuration:** مبدأ Rails الذي يوفر الوقت بجعل الإعدادات القياسية تعمل تلقائيًا دون كتابة إعدادات يدوية.',
      '**سهولة القراءة الاستثنائية:** كود روبي يكاد يُقرأ كجمل لغة إنجليزية طبيعية.',
    ],
    example: `# مثال بلغة Ruby الأنيقة
class Course
  attr_reader :title, :lessons

  def initialize(title, lessons)
    @title = title
    @lessons = lessons
  end

  def summary
    "دورة #{@title} تحتوي على #{@lessons} درساً."
  end
end

course = Course.new("أساسيات Ruby", 26)
puts course.summary

# تكرار أنيق
3.times { |i| puts "تكرار رقم #{i + 1}" }`,
    tips: 'إذا كنت تريد بناء منتج تجريبي أو شركة ناشئة (MVP) بسرعة قياسية، فإن Ruby on Rails تظل واحدة من أسرع المنصات للإنتاجية.',
  },

  postgresql: {
    name: 'PostgreSQL',
    category: 'قواعد البيانات العلائقية المتقدمة',
    summary: 'أقوى قاعدة بيانات علائقية مفتوحة المصدر في العالم؛ تتميز بالأداء العالي، والمطابقة الصارمة للمعايير، ودعم المستندات المهجنة JSONB.',
    concepts: [
      '**دعم ACID الكامل:** ضمان سلامة المعاملات المالية والبيانات الحساسة حتى عند انقطاع الكهرباء أو الأعطال.',
      '**أعمدة JSONB:** تخزين وثائق NoSQL داخل جدول SQL والاستعلام عنها وفهرستها بسرعة خارقة.',
      '**الاستعلامات التكرارية والـ Window Functions:** تنفيذ تحليلات رياضية معقدة عبر دوال مثل `ROW_NUMBER()`, `RANK()`, `LEAD()`.',
      '**التوسعات (Extensions):** مثل PostGIS لإدارة البيانات الجغرافية والخرائط و pgvector للذكاء الاصطناعي.',
    ],
    example: `-- استعلام تحليلي متقدم باستخدام Window Functions في PostgreSQL
SELECT 
    student_id,
    course_name,
    score,
    DENSE_RANK() OVER (PARTITION BY course_name ORDER BY score DESC) as rank_in_course
FROM exam_results
WHERE score >= 60
ORDER BY course_name, rank_in_course;`,
    tips: 'استخدم نوع `JSONB` بدلاً من `JSON` العادي في PostgreSQL للاستفادة من الفهرسة الثنائية السريعة عبر فهارس GIN.',
  },

  rust: {
    name: 'Rust',
    category: 'برمجة النظم وأمان الذاكرة الخارق',
    summary: 'اللغة الأكثر حباً للمطورين عالمياً؛ تجمع بين سرعة C++ القصوى وبين ضمان أمان الذاكرة ومنع الثغرات دون الحاجة لجامع قمامة.',
    concepts: [
      '**نظام الملكية والإعارة (Ownership & Borrowing):** كل قيمة لها مالك واحد فقط، وعند خروج المالك من النطاق تُحرر الذاكرة فورًا دون تسريبات.',
      '**أمان التزامن (Fearless Concurrency):** المترجم يمنع تضارب البيانات في الخيوط المتزامنة (Data Races) أثناء وقت الترجمة.',
      '**معالجة الأخطاء الآمنة:** لا توجد استثناءات غير متوقعة، الاعتماد على نوع `Result<T, E>` و `Option<T>` ومطابقة الأنماط `match`.',
      '**مدير الحزم Cargo:** واحدة من أفضل أدوات إدارة الحزم وبناء المشاريع وتشغيل الاختبارات في عالم البرمجة.',
    ],
    example: `// مثال عملي في Rust: معالجة البيانات بأمان تام
fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err("لا يمكن القسمة على صفر!".to_string())
    } else {
        Ok(a / b)
    }
}

fn main() {
    let numbers = vec![10, 20, 30];
    for n in &numbers {
        println!("العدد: {}", n);
    }

    match divide(100.0, 4.0) {
        Ok(res) => println!("النتيجة: {}", res),
        Err(err) => println!("خطأ: {}", err),
    }
}`,
    tips: 'في بداية تعلمك لـ Rust، قد تواجه صعوبة مع الـ Borrow Checker؛ لا تقلق، هذا طبيعي، وبمجرد فهم الملكية ستكتب كوداً خاليًا من الأخطاء تمامًا.',
  },

  dart: {
    name: 'Dart',
    category: 'لغة إطار عمل Flutter وتطبيقات العصر',
    summary: 'لغة برمجة كائنية أنيقة طورتها Google؛ تجمع بين سهولة التعلم وسرعة الأداء، وهي اللغة الأساسية لبناء تطبيقات Flutter.',
    concepts: [
      '**Sound Null Safety:** نظام أنواع يضمن عدم حدوث أخطاء الـ Null أثناء وقت التشغيل نهائيًا.',
      '**أنماط الترجمة المزدوجة:** تدعم JIT (الترجمة الفورية) لسرعة التطوير والـ Hot Reload، و AOT للترجمة إلى كود آلي سريع للمستخدم.',
      '**البرمجة غير المتزامنة:** دعم قوي للـ `Future` و `Stream` لمعالجة تدفقات البيانات المستمرة.',
      '**البرمجة الكائنية والـ Mixins:** دعم الـ Mixins لإعادة استخدام الكود بين الفئات دون قيود الوراثة الفردية.',
    ],
    example: `// دالة غير متزامنة مع Null Safety في Dart
Future<String> fetchUserGreeting(String? username) async {
  await Future.delayed(const Duration(milliseconds: 500));
  final safeName = username ?? "زائر منصة كود";
  return "أهلاً بك يا $safeName!";
}

void main() async {
  final greeting = await fetchUserGreeting("عمر");
  print(greeting);
}`,
    tips: 'تعلم أساسيات Dart أولاً لمدة أيام قليلة قبل الغوص في Flutter؛ هذا سيوفر عليك الكثير من الارتباك ويسرع فهمك للويدجتس.',
  },

  r: {
    name: 'R',
    category: 'الحوسبة الإحصائية وعلم البيانات',
    summary: 'اللغة المخصصة لعلماء الإحصاء، الباحثين الأكاديميين، ومحللي البيانات؛ الرائدة في التحليلات الإحصائية وتوليد الرسوم البيانية الدقيقة.',
    concepts: [
      '**المتجهات والمصفوفات (Vectors & Data Frames):** التعامل مع مجموعات البيانات ككتل رياضية متكاملة دون الحاجة لحلقات يدوية.',
      '**منظومة Tidyverse:** مجموعة مكتبات شهيرة مثل `dplyr` و `tidyr` لتنظيف وترتيب وتحليل البيانات بأسلوب مقروء.',
      '**مكتبة ggplot2:** أقوى أداة في العالم لتوليد رسومات بيانية احترافية تعتمد على قواعد الرسم البياني (Grammar of Graphics).',
      '**التحليل الإحصائي:** دوال مدمجة لاختبار الفرضيات، الانحدار الخطي، والنمذجة الرياضية المتقدمة.',
    ],
    example: `# تحليل بيانات بسيط في لغة R
# إنشاء إطار بيانات
students <- data.frame(
  name = c("سارة", "أحمد", "ياسمين", "كريم"),
  score = c(92, 85, 78, 96),
  passed = c(TRUE, TRUE, TRUE, TRUE)
)

# حساب المتوسط والانحراف المعياري
avg_score <- mean(students$score)
print(paste("متوسط درجات الطلاب:", avg_score))

# تصفية الطلاب المتفوقين
high_achievers <- subset(students, score >= 90)
print(high_achievers)`,
    tips: 'إذا كنت باحثًا علميًا أو تعمل في مجالات الإحصاء الحيوي والمالي، فإن إتقان R مع حزمة ggplot2 سيجعل أبحاثك وتقاريرك متميزة للغاية.',
  },

  bash: {
    name: 'Bash & Shell Scripting',
    category: 'أتمتة الأنظمة وخوادم Linux',
    summary: 'سطر الأوامر الأساسي ولغة السكربتات في أنظمة Linux و macOS؛ أداة يومية لا غنى عنها لمهندسي DevOps، الخوادم، والمطورين لأتمتة المهام.',
    concepts: [
      '**الأنابيب وإعادة التوجيه (Pipes & Redirection):** تمرير مخرجات أمر كمدخلات لأمر آخر عبر `|` وحفظها بالملفات عبر `>` و `>>`.',
      '**أدوات معالجة النصوص الجبارة:** استخدام `grep` للبحث، و `awk` لاستخراج الأعمدة، و `sed` للاستبدال الفوري داخل الملفات.',
      '**السكربتات والـ Cron Jobs:** كتابة ملفات `.sh` تحتوي على شروط وحلقات لتنفيذ النسخ الاحتياطي ومراقبة الخادم تلقائيًا.',
      '**إدارة الصلاحيات والعمليات:** أوامر إدارة النظام مثل `chmod`, `chown`, `ps`, `kill`, `top`.',
    ],
    example: `#!/usr/bin/env bash
# سكربت لفحص مساحة القرص والنسخ الاحتياطي
BACKUP_DIR="/var/backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

echo "=== فحص حالة الخادم: $TIMESTAMP ==="
df -h | grep -E '^/dev/'

if [ -d "$BACKUP_DIR" ]; then
    echo "مجلد النسخ الاحتياطي موجود: $BACKUP_DIR"
else
    echo "جاري إنشاء مجلد النسخ الاحتياطي..."
    mkdir -p "$BACKUP_DIR"
fi

echo "تم الفحص بنجاح!"`,
    tips: 'ضع دائمًا السطر `set -euo pipefail` في بداية سكربتات Bash في بيئة العمل؛ ليوقف السكربت فور حدوث أي خطأ بدلاً من الاستمرار الصامت.',
  },

  lua: {
    name: 'Lua',
    category: 'برمجة الألعاب والأنظمة الخفيفة المدمجة',
    summary: 'لغة سريعة وصغيرة الحجم للغاية وسهلة الدمج؛ تستخدم في برمجة الألعاب في منصة Roblox، محركات Defold، وتخصيص خوادم Redis و Nginx.',
    concepts: [
      '**الجداول (Tables):** هيكل البيانات الوحيد والشامل في Lua؛ يُستخدم كمصفوفة، وقاموس، وكائن، وحاوية بيانات.',
      '**الخفة والسرعة:** مفسر اللغة لا يتجاوز مئات الكيلوبايتات، وتعتبر من أسرع لغات السكربتات بفضل محرك LuaJIT.',
      '**الدمج الفائق مع C/C++:** صممت خصيصًا ليتم تضمينها داخل برامج مكتوبة بلغات أخرى لتمكين المستخدمين من كتابة إضافات برمجية.',
      '**الـ Metatables:** ميزة متقدمة لتعديل سلوك الجداول وإضافة دعم البرمجة الكائنية والحسابات المخصصة.',
    ],
    example: `-- برمجة الكائنات والجداول في Lua
local Player = { name = "البطل", score = 0 }

function Player:addScore(points)
    self.score = self.score + points
    print(self.name .. " حصل على " .. points .. " نقاط! المجموع: " .. self.score)
end

Player:addScore(50)
Player:addScore(30)

-- جدول كمصفوفة
local weapons = { "سيف", "قوس", "درع" }
for i, weapon in ipairs(weapons) do
    print(i .. ": " .. weapon)
end`,
    tips: 'إذا كنت ترغب في دخول عالم تطوير الألعاب عبر منصة Roblox الشهيرة، فإن إتقان Lua هو خطوتك الأولى والأساسية.',
  },

  scala: {
    name: 'Scala',
    category: 'البيانات الضخمة والأنظمة الوظيفية',
    summary: 'لغة تجمع ببراعة بين البرمجة الكائنية والبرمجة الوظيفية، تعمل على JVM، وهي اللغة الأساسية لمحرك Apache Spark لمعالجة البيانات الضخمة (Big Data).',
    concepts: [
      '**الجمع بين النموذجين (OOP + Functional):** كل قيمة هي كائن، وكل دالة هي قيمة يمكن تمريرها وإرجاعها.',
      '**الثبات (Immutability):** تشجيع استخدام `val` بدلاً من `var` لتجنب الأخطاء في البيئات المتزامنة الموزعة.',
      '**مطابقة الأنماط (Pattern Matching):** أسلوب فائق القوة لفحص وتفكيك هياكل البيانات المعقدة بأمان تام.',
      '**محرك Apache Spark:** معالجة تيرابايت من البيانات الموزعة على مئات الخوادم بكود موجز وأداء عالي.',
    ],
    example: `// مثال بلغة Scala: فئات الحالات ومطابقة الأنماط
sealed trait CourseLevel
case object Beginner extends CourseLevel
case object Intermediate extends CourseLevel
case object Advanced extends CourseLevel

case class Course(title: String, level: CourseLevel, lessons: Int)

object Main extends App {
  val courses = List(
    Course("Scala للبيانات الضخمة", Intermediate, 30),
    Course("أساسيات بايثون", Beginner, 50)
  )

  courses.foreach { course =>
    val desc = course.level match {
      case Beginner     => "مستوى مبتدئ ومناسب للجميع"
      case Intermediate => "مستوى متوسط يتطلب معرفة سابقة"
      case Advanced     => "مستوى متقدم للمحترفين"
    }
    println(s"\${course.title}: \$desc")
  }
}`,
    tips: 'تعلم Scala يفتح لك أبواب العمل في كبرى شركات هندسة البيانات (Data Engineering) والأنظمة المالية الفائقة.',
  },

  c: {
    name: 'C',
    category: 'برمجة النظم والمتحكمات الدقيقة',
    summary: 'أم لغات البرمجة الحديثة؛ كتب بها كيرنل أنظمة Linux و Windows وقواعد بيانات MySQL ومفسرات بايثون؛ توفر سيطرة كاملة ومباشرة على العتاد.',
    concepts: [
      '**المؤشرات وإدارة الذاكرة (Pointers):** حجز الذاكرة يدويًا عبر `malloc()` وتحريرها بـ `free()` مع التعامل مع عناوين الهاردوير.',
      '**السرعة الصافية:** لا يوجد جامع قمامة ولا آلة افتراضية؛ الكود يُترجم مباشرة إلى لغة الآلة وينفذ بأقصى سرعة ممكنة.',
      '**الهياكل (Structs):** تجميع البيانات المرتبطة في بنية واحدة منظمة.',
      '**الأنظمة المدمجة (Embedded Systems):** لغة برمجة المتحكمات مثل Arduino و ESP32 والأجهزة الذكية والسيارات.',
    ],
    example: `#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int id;
    char name[50];
} Student;

int main() {
    // حجز مساحة في الذاكرة الحرة (Heap)
    Student *s = (Student *)malloc(sizeof(Student));
    if (s == NULL) {
        printf("فشل حجز الذاكرة!\\n");
        return 1;
    }

    s->id = 101;
    snprintf(s->name, sizeof(s->name), "يوسف");

    printf("طالب رقم: %d، الاسم: %s\\n", s->id, s->name);

    // تحرير الذاكرة لمنع التسرب (Memory Leak)
    free(s);
    return 0;
}`,
    tips: 'في لغة C، تذكر دائمًا القاعدة الذهبية: كل `malloc` يجب أن يقابلها `free` واحدة فقط، لتفادي مشاكل تسرب الذاكرة وانهيار النظام.',
  },

  elixir: {
    name: 'Elixir',
    category: 'الأنظمة الموزعة والتطبيقات ذات التزامن الضخم',
    summary: 'لغة وظيفية ديناميكية مبنية فوق منصة Erlang VM (BEAM)، مشهورة بتحمل الأخطاء والقدرة على التعامل مع ملايين الاتصالات المتزامنة بكفاءة (مثل منصة Discord و WhatsApp).',
    concepts: [
      '**نموذج الممثلين (Actor Model):** ملايين العمليات الخفيفة المعزولة التي تتواصل عبر الرسائل فقط دون مشاركة الذاكرة.',
      '**عامل الأنابيب الأنيق (`|>`):** تمرير نتيجة التعبير كأول معامل للدالة التالية لقراءة الكود كسلسلة أفعال واضحة.',
      '**مبدأ التسامح مع الأخطاء (Let it Crash):** شجرات المراقبة (Supervisors) تعيد تشغيل أي عملية تفشل فوراً بجزء من الملي ثانية.',
      '**إطار عمل Phoenix:** إطار ويب فائق السرعة يدعم الـ Real-time عبر WebSockets لملايين المستخدمين في وقت واحد.',
    ],
    example: `# مثال بلغة Elixir الأنيقة
defmodule Calculator do
  def process_numbers(numbers) do
    numbers
    |> Enum.filter(&(&1 > 0))       # تصفية الأعداد الموجبة
    |> Enum.map(&(&1 * 2))          # مضاعفة كل عدد
    |> Enum.sum()                   # حساب المجموع
  end
end

result = Calculator.process_numbers([-5, 10, 20, 30])
IO.puts("النتيجة بعد المعالجة بالأنابيب: #{result}")`,
    tips: 'إذا كنت تبحث عن لغة تبني بها تطبيقات محادثة فورية، ألعاب متعددة اللاعبين، أو منصات تتطلب 99.999% من وقت التشغيل، فـ Elixir هي خيارك السحري.',
  },

  haskell: {
    name: 'Haskell',
    category: 'البرمجة الوظيفية البحتة (Pure Functional)',
    summary: 'لغة وظيفية نقية تعتمد على المعادلات الرياضية الصارمة؛ كل دالة فيها قطعية وخالية من الآثار الجانبية، مع نظام أنواع رياضي يمنع الأخطاء تماماً.',
    concepts: [
      '**الدوال النقية (Pure Functions):** إعطاء نفس المدخلات ينتج عنه حتمًا نفس المخرجات دائمًا، دون تعديل أي حالة خارجية.',
      '**التقييم الكسول (Lazy Evaluation):** لا يتم حساب أي قيمة أو تعبير رياضي حتى يحتاج البرنامج إليها فعليًا، مما يتيح التعامل مع قوائم لانهائية.',
      '**نظام الأنواع الاستدلالي الصارم:** اكتشاف 99% من الأخطاء أثناء وقت الترجمة؛ مقولة مشهورة: "إذا تُرجم كود هاسكل، فإنه يعمل بالشكل الصحيح!".',
      '**المونادات (Monads):** الأسلوب الرياضي الأنيق لعزل عمليات الإدخال والإخراج وتغيير الحالة عن جوهر البرنامج النقي.',
    ],
    example: `-- دوال نقية وتوليد قوائم في Haskell
doubleEven :: [Int] -> [Int]
doubleEven xs = [x * 2 | x <- xs, even x]

factorial :: Integer -> Integer
factorial 0 = 1
factorial n = n * factorial (n - 1)

main :: IO ()
main = do
  putStrLn "مرحباً بك في عالم البرمجة الوظيفية النقية بـ Haskell"
  print (doubleEven [1, 2, 3, 4, 5, 6])
  putStrLn ("مضروب الرقم 5: " ++ show (factorial 5))`,
    tips: 'دراسة Haskell ستغير طريقة تفكيرك البرمجي بالكامل وتجعلك تكتب كودًا أكثر نقاءً وتنظيمًا في أي لغة أخرى تستخدمها.',
  },

  julia: {
    name: 'Julia',
    category: 'الحوسبة العلمية والرياضية والذكاء الاصطناعي',
    summary: 'صُممت لحل "مشكلة اللغتين"؛ تجمع بين سهولة القراءة والكتابة مثل Python، وبين السرعة الخارقة في الحسابات المعقدة مثل C.',
    concepts: [
      '**الإرسال المتعدد (Multiple Dispatch):** اختيار النسخة المناسبة من الدالة تلقائيًا بناءً على أنواع جميع المعاملات في وقت التشغيل بكفاءة مذهلة.',
      '**الترجمة في الوقت الفعلي (LLVM JIT):** ترجمة الكود إلى تعليمات معالج فائقة السرعة تماثل أداء كود C المكتوب يدويًا.',
      '**التعامل الفطري مع المصفوفات والجبر الخطي:** العمليات الرياضية مثل `A * B` مدمجة وسريعة وتدعم البث الرياضي التلقائي عبر النقطة `.`',
      '**الحوسبة المتوازية والموزعة:** دعم أصلي لتشغيل الحسابات على وحدات معالجة الرسوميات (GPUs) ومجموعات الخوادم.',
    ],
    example: `# مصفوفات وحسابات علمية سريعة في Julia
function calculate_hypotenuse(a::Float64, b::Float64)::Float64
    return sqrt(a^2 + b^2)
end

# إنشاء مصفوفة وتطبيق عملية البث (.^)
data = [1.0, 2.0, 3.0, 4.0]
squares = data .^ 2

println("الوتر لمثلث 3 و 4: ", calculate_hypotenuse(3.0, 4.0))
println("مربعات المصفوفة: ", squares)`,
    tips: 'إذا كنت تعمل في مجالات الهندسة، المحاكاة الفيزيائية، الرياضيات، أو أبحاث الذكاء الاصطناعي الثقيلة، فإن Julia هي لغة المستقبل.',
  },

  perl: {
    name: 'Perl',
    category: 'معالجة النصوص وإدارة الأنظمة التاريخية',
    summary: 'لغة معالجة النصوص السويسرية الشهيرة؛ صاحبة أقوى دعم للتعابير النمطية (Regex) في تاريخ الحوسبة وأساس أتمتة خوادم الويب في عصرها الذهبي.',
    concepts: [
      '**قوة التعابير النمطية (Regular Expressions):** قدرات بحث واستبدال في النصوص لا يضاهيها أي لغة أخرى في السهولة والمباشرة.',
      '**شعار اللغة (TMTOWTDI):** "هناك أكثر من طريقة لإنجاز الأمر"؛ حرية تامة للمطور في اختيار أسلوب كتابة الكود.',
      '**مكتبات CPAN الضخمة:** أول وأكبر مستودع مكتبات برمجية مفتوحة المصدر تم بناؤه في تاريخ الويب.',
      '**معالجة الملفات والتقارير:** صممت خصيصًا لقراءة ملفات السجلات (Logs) وإنتاج تقارير سريعة.',
    ],
    example: `#!/usr/bin/perl
use strict;
use warnings;

# قراءة ومعالجة نص باستخدام Regex
my $text = "مرحباً بكم في منصة كود، تاريخ اليوم: 2026-10-23";

if ($text =~ /(\\d{4})-(\\d{2})-(\\d{2})/) {
    print "تم استخراج التاريخ بنجاح: السنة $1، الشهر $2، اليوم $3\\n";
}

my @courses = ("Perl", "Python", "Bash");
foreach my $c (@courses) {
    print "مسار متاح: $c\\n";
}`,
    tips: 'استخدم دائمًا `use strict;` و `use warnings;` في بداية أي سكربت Perl لإجبارك على تعريف المتغيرات وتجنب الأخطاء الإملائية.',
  },

  powershell: {
    name: 'PowerShell',
    category: 'إدارة أنظمة ويندوز والسحابة (Azure)',
    summary: 'بيئة أوامر ولغة أتمتة قوية مبنية على .NET من Microsoft؛ تتميز بتمرير الكائنات الكاملة (Objects) عبر الأنابيب بدلاً من مجرد نصوص.',
    concepts: [
      '**أوامر Cmdlets القياسية:** نمط التسمية الموحد (فعل-اسم مثل `Get-Process`, `Restart-Service`, `New-Item`).',
      '**الأنابيب الموجهة للكائنات (Object Pipelines):** تمرير كائن متكامل يحمل خصائص ودوال عبر `|`، مما يلغي الحاجة لتقطيع النصوص يدويًا.',
      '**إدارة السحابة (Azure & AWS):** وحدات كاملة لإدارة السيرفرات السحابية، المستخدمين، والموارد بنقرة زر وسكربت واحد.',
      '**التوافق الكامل مع .NET:** إمكانية استدعاء أي كلاس أو مكتبة من منظومة .NET مباشرة داخل سطر الأوامر.',
    ],
    example: `# سكربت باورشيل لفحص الخدمات واستهلاك الذاكرة
Write-Host "=== فحص العمليات الأكثر استهلاكاً للذاكرة ===" -ForegroundColor Green

Get-Process | 
    Where-Object { $_.WorkingSet -gt 50MB } | 
    Sort-Object WorkingSet -Descending | 
    Select-Object -First 5 ProcessName, @{Name="Memory (MB)"; Expression={[math]::round($_.WorkingSet / 1MB, 2)}} |
    Format-Table -AutoSize`,
    tips: 'استفد دائمًا من ميزة الإكمال التلقائي بـ Tab والأمر `Get-Help اسم-الأمر -Examples` لمعرفة كيفية استخدام أي أمر فورياً.',
  },

  // لغات العالم المنطوقة
  english: {
    name: 'اللغة الإنجليزية',
    category: 'لغات العالم المنطوقة',
    summary: 'لغة التكنولوجيا والبرمجة والتواصل الدولي الأولى في العالم؛ مفتاحك الأول لقراءة المراجع البرمجية والتوظيف العالمي.',
    concepts: [
      '**الأزمنة الأساسية:** المضارع البسيط للحقائق اليومية (I learn code)، والمضارع التام للخبرات (I have learned Python).',
      '**المفردات التقنية:** فهم المصطلحات الشائعة مثل deploy, debug, loop, execute, syntax.',
      '**حروف الجر:** إتقان استخدام in, on, at للأوقات والأماكن والمفاهيم المجردة.',
      '**المحادثة اليومية:** عبارات الاستفسار والطلب المهذب (Could you please explain this concept?).',
    ],
    example: `Useful Daily & Tech Phrases:
• "I am currently learning full-stack web development on Code Platform."
• "Could you please help me understand how this function works?"
• "The best way to improve your English is through daily conversation practice."
• "Practice makes progress! Keep coding and keep communicating."`,
    tips: 'اقرأ التوثيق البرمجي (Documentation) باللغة الإنجليزية وشاهد شروحات يوتيوب بالإنجليزية لتقوية لغتك ومصطلحاتك البرمجية معاً.',
  },

  spanish: {
    name: 'اللغة الإسبانية',
    category: 'لغات العالم المنطوقة',
    summary: 'ثاني أكثر لغة محكية كلغة أم في العالم بأكثر من 500 مليون ناطق؛ تمتاز بسهولة نطقها وقرب مخارج حروفها من القواعد المكتوبة.',
    concepts: [
      '**الفرق بين Ser و Estar:** كلاهما يعني "يكون"، لكن `Ser` للحقائق والصفات الدائمة، و `Estar` للحالات المؤقتة والمواقع.',
      '**التذكير والتأنيث:** الكلمات المنتهية بـ -o مذكرة غالبًا (el libro)، والمنتهية بـ -a مؤنثة غالبًا (la casa).',
      '**النطق الصوتي:** كل حرف يكتب يُنطق تقريبًا، مع ملاحظة أن حرف `H` صامت دائمًا، والـ `LL` تنطق كحرف الياء أو الجيم الخفيفة.',
      '**الأفعال في الحاضر:** تصريف أفعال النهايات الثلاث (-ar, -er, -ir) مع الضمائر المختلفة (Yo, Tú, Él, Nosotros).',
    ],
    example: `Frases Útiles en Español:
• ¡Hola! ¿Cómo estás? (مرحباً! كيف حالك؟)
• Estoy aprendiendo a programar con la plataforma Code. (أنا أتعلم البرمجة مع منصة كود)
• ¿Dónde está la biblioteca? (أين توجد المكتبة؟)
• Muchas gracias por tu ayuda, amigo. (شكراً جزيلاً على مساعدتك يا صديقي)`,
    tips: 'تحدث بصوت مسموع وكرر الجمل الإسبانية بموسيقيتها المميزة؛ استمع إلى محادثات البودكاست المخصصة للمبتدئين 10 دقائق يومياً.',
  },

  french: {
    name: 'اللغة الفرنسية',
    category: 'لغات العالم المنطوقة',
    summary: 'لغة الدبلوماسية، الثقافة، والأناقة؛ يتحدث بها مئات الملايين عبر أوروبا وإفريقيا وكندا وتفتح آفاقًا دراسية ومهنية كبرى.',
    concepts: [
      '**أدوات التعريف والتنكير:** `le` للمذكر، `la` للمؤنث، `les` للجمع، و `un / une / des` للتنكير.',
      '**أسلوب النفي الأنيق:** وضع الفعل بين شقي النفي `ne ... pas` مثل: `Je ne sais pas` (أنا لا أعلم).',
      '**الربط الصوتي (La Liaison):** وصل الحرف الساكن الأخير من الكلمة الأولى بالحرف المتحرك في بداية الكلمة التالية.',
      '**الأفعال المساعدة (Être & Avoir):** أساس تصريف الأزمنة المركبة كالماضي المركب (Passé Composé).',
    ],
    example: `Phrases Essentielles en Français:
• Bonjour, comment allez-vous ? (صباح الخير، كيف حالكم؟)
• J'apprends la programmation étape par étape. (أتعلم البرمجة خطوة بخطوة)
• Pourriez-vous m'aider, s'il vous plaît ? (هل يمكنك مساعدتي، من فضلك؟)
• C'est magnifique ! (هذا رائع وممتاز!)`,
    tips: 'ركز على مخارج حروف العلة الفرنسية وحرف R الحلقي بالاستماع والتكرار المستمر أمام المرآة.',
  },

  german: {
    name: 'اللغة الألمانية',
    category: 'لغات العالم المنطوقة',
    summary: 'لغة الهندسة، الاقتصاد الأوروبي الأقوى، والبحث العلمي؛ لغة منطقية ومنظمة بدرجة عالية تمنحك فرص عمل مذهلة في ألمانيا والنمسا وسويسرا.',
    concepts: [
      '**أدوات التعريف الثلاث:** `der` للمذكر، `die` للمؤنث، `das` للمحايد، و `die` للجمع.',
      '**الحالات الإعرابية (Kasus):** الرفع (Nominativ)، النصب (Akkusativ)، والجر (Dativ)، وهي ما يحدد أدوار الكلمات في الجملة.',
      '**موقع الفعل المقدس:** في الجملة الرئيسية، الفعل يأتي دائمًا في الموقع رقم 2 (Verb auf Position 2).',
      '**الكلمات المركبة:** قدرة الألمانية على دمج كلمتين أو أكثر في كلمة واحدة دقيقة المعنى.',
    ],
    example: `Nützliche Sätze auf Deutsch:
• Guten Tag! Wie geht es Ihnen? (طاب يومك! كيف حال حضرتك؟)
• Ich lerne gerade Programmieren und Sprachen. (أنا أتعلم البرمجة واللغات حالياً)
• Das ist eine sehr gute Frage. (هذا سؤال جيد جداً)
• Übung macht den Meister! (التدريب يصنع الأستاذ / التكرار يعلم الشطار)`,
    tips: 'احفظ كل اسم ألماني جديد مع أداة تعريفه وصيغة الجمع فورًا (مثلاً: das Buch, die Bücher)؛ فهذا يوفر عليك 80% من صعوبات القواعد لاحقًا.',
  },

  italian: {
    name: 'اللغة الإيطالية',
    category: 'لغات العالم المنطوقة',
    summary: 'أجمل لغات العالم نطقًا وموسيقية؛ لغة الفن، العمارة، والتصميم، وتتميز بنطقها المطابق تقريبًا لطريقة كتابتها.',
    concepts: [
      '**مخارج الحروف الواضحة:** كل حرف علة يُنطق بوضوح ودون أصوات بلعومية معقدة.',
      '**الجمع عبر تغيير الحرف الأخير:** المذكر ينتهي بـ -o ويجمع بـ -i، والمؤنث ينتهي بـ -a ويجمع بـ -e.',
      '**الضمائر المستترة:** نظرًا لوضوح تصريف الفعل، لا يلزم كتابة ضمير الفاعل دائمًا (Parlo italiano = أنا أتحدث الإيطالية).',
      '**عبارات الترحيب والمجاملة:** ciao, buongiorno, grazie mille, per favore.',
    ],
    example: `Frasi Utili in Italiano:
• Ciao! Come stai? (أهلاً! كيف حالك؟)
• Sto imparando a programmare passo dopo passo. (أتعلم البرمجة خطوة بخطوة)
• Un caffè, per favore. (قهوة من فضلك)
• Piacere di conoscerti! (سعيد بلقائك ومعرفتك!)`,
    tips: 'الإيطالية لغة تعتمد على التعبير الصوتي ونبرة الصوت؛ قلد نطق المتحدثين الأصليين واستمتع بموسيقية الكلمات.',
  },

  turkish: {
    name: 'اللغة التركية',
    category: 'لغات العالم المنطوقة',
    summary: 'لغة عريقة تربط الشرق بالغرب؛ لغة منطقية للغاية ومنتظمة القواعد، لا تحتوي على استثناءات تقريبًا وتعتمد على نظام الإلصاق.',
    concepts: [
      '**لغة الإلصاق (Agglutinative Language):** إضافة لواحق للكلمة الأصلية للتعبير عن الملكية والزمان والضمائر في كلمة واحدة.',
      '**التناغم الصوتي (Vowel Harmony):** توافق حروف العلة الثقيلة مع الثقيلة والخفيفة مع الخفيفة داخل الكلمة ولواحقها.',
      '**انعدام التذكير والتأنيث:** الضمير `O` يستخدم للغائب المفرد المذكر والمؤنث معًا بكل بساطة.',
      '**ترتيب الجملة:** الفاعل أولاً، ثم المفعول، ثم الفعل في نهاية الجملة دائمًا (SOV).',
    ],
    example: `Türkçe Günlük İfadeler:
• Merhaba! Nasılsınız? (مرحباً! كيف حالكم؟)
• Ben yazılım öğreniyorum. (أنا أتعلم البرمجة)
• Teşekkür ederim, çok naziksiniz. (شكراً جزيلاً، أنت لطيف جداً)
• Kolay gelsin! (أتمنى لك عملاً ميسراً وسهلاً!)`,
    tips: 'احفظ قاعدة التناغم الصوتي الثنائي والرباعي جيدًا؛ فهي المفتاح السحري لإتقان جميع لواحق وقواعد اللغة التركية.',
  },

  world_languages: {
    name: 'لغات العالم المنطوقة',
    category: 'اللغات',
    summary: 'تعلم لغات العالم يفتح لك آفاق التوظيف الدولي، الهجرة، السفر، وفهم حضارات وثقافات شعوب العالم.',
    concepts: [
      '**الإنجليزية:** لغة التكنولوجيا والبرمجة الأولى عالميًا ومفتاح العلوم الحديثة.',
      '**الفرنسية:** لغة الدبلوماسية والأدب والأناقة في أوروبا وإفريقيا.',
      '**الإسبانية:** أكثر اللغات انتشارًا وسهولة في النطق والتحدث عالميًا.',
      '**الألمانية:** لغة الصناعة والهندسة والوظائف القوية في قلب أوروبا.',
      '**الإيطالية والتركية:** لغات ثقافية ساحرة وسهلة التعلم بقواعد منطقية ومنتظمة.',
    ],
    example: `تحيات أساسية بلغات العالم المختلفة:
• الإنجليزية: Hello! How can I help you?
• الفرنسية: Bonjour ! Comment puis-je vous aider ?
• الإسبانية: ¡Hola! ¿En qué puedo ayudarte?
• الألمانية: Hallo! Wie kann ich Ihnen helfen?
• الإيطالية: Ciao! Come posso aiutarti?
• التركية: Merhaba! Size nasıl yardımcı olabilirim?`,
    tips: 'خصص 15 دقيقة يوميًا للاستماع والممارسة اليومية بدلاً من الدراسة الطويلة المتقطعة؛ الاستمرارية هي سر إتقان أي لغة.',
  },
}

export function generateSmartAssistantReply(userQuestion = '', history = []) {
  const query = userQuestion.toLowerCase().trim()

  // 1. ترحيب وتعريف عام
  if (!query || query.match(/^(مرحبا|مرحباً|أهلا|اهلا|سلام|السلام عليكم|صباح الخير|مساء الخير|مين انت|من انت|ازيك|ازيك؟|الو|hello|hi)$/)) {
    return `أهلاً بك يا بطل! 👋 أنا **مساعد كود الذكي**.
أنا جاهز فورياً لمساعدتك وشرح كل ما يتعلق بـ:
• **جميع لغات البرمجة الـ 30 في المنصة:**
  JavaScript, React, Python, Flutter, SQL, Java, TypeScript, C++, HTML, CSS, PHP, MongoDB, Kotlin, Go, Swift, C#, Ruby, PostgreSQL, Rust, Dart, R, Bash, Lua, Scala, C, Elixir, Haskell, Julia, Perl, PowerShell.
• **لغات العالم المنطوقة الـ 10:**
  الإنجليزية، الإسبانية، الفرنسية، الألمانية، الإيطالية، التركية، وغيرها.
• كتابة الأكواد، شرح المفاهيم، حل الأخطاء، وتقديم نصائح مهنية.

اسألني عن أي لغة أو مفهوم وسأشرحه لك فورًا مع مثال عملي كامل! 🚀`
  }

  // 2. من أين أبدأ / مبتدئ / خارطة طريق
  if (query.includes('من اين ابدا') || query.includes('ابدأ منين') || query.includes('مبتدئ') || query.includes('خارطة طريق') || query.includes('طريق البرمجة') || query.includes('نصيحة للمبتدئين')) {
    return `### 🧭 دليلك الذكي للبدء في عالم البرمجة:

1. **حدد مجالك المفضل أولاً:**
   • **تطوير واجهات ومواقع الويب (Web):** ابدأ بـ **HTML** ثم **CSS** ثم **JavaScript**، ثم مكتبة **React**.
   • **الذكاء الاصطناعي وعلم البيانات (AI & Data):** لغة **Python** هي الخيار رقم 1 عالمياً.
   • **تطبيقات الهواتف (Mobile Apps):** اختر **Flutter & Dart** أو **Kotlin** لأندرويد أو **Swift** لآيفون.
   • **برمجة النظم والألعاب والأداء الخارق:** اختر **C++** أو **C#** أو **Rust**.
   • **الخوادم السحابية والـ Backend السريع:** اختر **Go (Golang)** أو **Node.js** أو **PHP / Laravel** أو **Java**.

2. **نصيحة كود الذهبية:**
   لا تكتفِ بالمشاهدة النظرية! افتح الكتاب هنا في المنصة، جرب الكود بيدك، واضغط على زر **"اختبر نفسك"** للتأكد من استيعابك. 💡`
  }

  // 3. مقارنات شهيرة
  if (query.includes('فرق') || query.includes('مقارنة') || query.includes('افضل ولا') || query.includes('أيهما أفضل') || query.includes('احسن')) {
    if (query.includes('python') || query.includes('بايثون') || query.includes('javascript') || query.includes('جافاسكريبت')) {
      return `### ⚖️ مقارنة بين بايثون (Python) وجافاسكريبت (JavaScript):

| وجه المقارنة | Python 🐍 | JavaScript ⚡ |
| :--- | :--- | :--- |
| **المجال الأساسي** | الذكاء الاصطناعي، علم البيانات، الأتمتة، والباك إند. | تطوير واجهات الويب (الفرونت إند)، والباك إند عبر Node.js. |
| **سهولة التعلم** | سهلة جدًا، شبيهة بالإنجليزية، وتعتمد على المسافات. | سهلة وسريعة مع مفاهيم غير متزامنة (Async) تتطلب ممارسة. |
| **بيئة التشغيل** | على الخوادم وأجهزة الكمبيوتر المحلية. | في كل متصفحات العالم وعلى الخوادم أيضًا. |

**الخلاصة:**
اختر **JavaScript** إذا كان هدفك بناء مواقع ويب تفاعلية وتطبيقات متكاملة.
اختر **Python** إذا كان شغفك يتجه نحو الذكاء الاصطناعي وتحليل البيانات والتعلم الآلي.`
    }

    if (query.includes('rust') || query.includes('رست') || query.includes('c++') || query.includes('سي بلس')) {
      return `### ⚖️ مقارنة بين C++ و Rust:

| وجه المقارنة | C++ ⚙️ | Rust 🦀 |
| :--- | :--- | :--- |
| **الأداء والسرعة** | سرعة خام فائقة وقوة لا حدود لها. | سرعة تماثل C++ تمامًا دون أي تأخير. |
| **أمان الذاكرة** | إدارة يدوية، قد تحدث أخطاء ذاكرة وتسريبات. | نظام ملكية (Ownership) يمنع أخطاء الذاكرة وقت الترجمة. |
| **الاستخدامات** | محركات الألعاب (Unreal)، البرمجيات الكبرى. | أنظمة التشغيل الحديثة، أدوات الويب عالية الأداء، التشفير. |

**الخلاصة:** C++ لها تاريخ عريق ومكتبات عملاقة، بينما Rust هي لغة المستقبل الآمنة للنظم.`
    }
  }

  // 4. مطابقة جميع لغات البرمجة الـ 30 في الموقع بدقة

  // JavaScript
  if (query.includes('javascript') || query.includes('جافاسكريبت') || query.includes('جافا سكريبت') || query.includes('js') || query.includes('node.js') || query.includes('nodejs') || query.includes('نود')) {
    return buildTopicReply(topicKnowledge.javascript, query)
  }

  // React
  if (query.includes('react') || query.includes('رياكت') || query.includes('jsx') || query.includes('hooks') || query.includes('virtual dom')) {
    return buildTopicReply(topicKnowledge.react, query)
  }

  // Python
  if (query.includes('python') || query.includes('بايثون') || query.includes('ذكاء اصطناعي') || query.includes('علم بيانات') || query.includes('ماشين ليرنينج')) {
    return buildTopicReply(topicKnowledge.python, query)
  }

  // Flutter
  if (query.includes('flutter') || query.includes('فلاتر') || (query.includes('موبايل') && !query.includes('كوتلن') && !query.includes('سويفت'))) {
    return buildTopicReply(topicKnowledge.flutter, query)
  }

  // PostgreSQL (قبل SQL العام)
  if (query.includes('postgres') || query.includes('بوستجرس') || query.includes('بوستجري')) {
    return buildTopicReply(topicKnowledge.postgresql, query)
  }

  // SQL & Databases
  if (!query.includes('postgres') && (query.includes('sql') || query.includes('استعلام') || query.includes('قواعد بيانات') || query.includes('قاعدة بيانات') || query.includes('جدول بيانات'))) {
    return buildTopicReply(topicKnowledge.sql, query)
  }

  // Java (تجنب الخلط مع جافاسكريبت)
  if ((query.includes('java') && !query.includes('javascript')) || (query.includes('جافا') && !query.includes('سكريبت')) || query.includes('jvm') || query.includes('spring')) {
    return buildTopicReply(topicKnowledge.java, query)
  }

  // TypeScript
  if (query.includes('typescript') || query.includes('تايب سكريبت') || query.includes('تايبسكريبت') || query.includes(' ts ') || query.endsWith(' ts')) {
    return buildTopicReply(topicKnowledge.typescript, query)
  }

  // C++
  if (query.includes('c++') || query.includes('سي بلس') || query.includes('سي++') || query.includes('cpp')) {
    return buildTopicReply(topicKnowledge.cpp, query)
  }

  // C#
  if (query.includes('c#') || query.includes('سي شارب') || query.includes('csharp') || query.includes('.net') || query.includes('دوت نت') || query.includes('unity') || query.includes('يونيتي')) {
    return buildTopicReply(topicKnowledge.csharp, query)
  }

  // HTML
  if (query.includes('html') || query.includes('إتش تي إم إل') || query.includes('اتش تي ام ال') || query.includes('هيكل الويب')) {
    return buildTopicReply(topicKnowledge.html, query)
  }

  // CSS
  if (query.includes('css') || query.includes('سي إس إس') || query.includes('سي اس اس') || query.includes('flexbox') || query.includes('تنسيق الويب')) {
    return buildTopicReply(topicKnowledge.css, query)
  }

  // PHP
  if (query.includes('php') || query.includes('بي إتش بي') || query.includes('بي اتش بي') || query.includes('laravel') || query.includes('لارافيل')) {
    return buildTopicReply(topicKnowledge.php, query)
  }

  // MongoDB
  if (query.includes('mongo') || query.includes('مونجو') || query.includes('nosql')) {
    return buildTopicReply(topicKnowledge.mongodb, query)
  }

  // Kotlin
  if (query.includes('kotlin') || query.includes('كوتلن') || query.includes('كوتلين') || query.includes('اندرويد') || query.includes('أندرويد')) {
    return buildTopicReply(topicKnowledge.kotlin, query)
  }

  // Go / Golang
  if (query.includes('golang') || query.includes('جولانج') || query.includes('لغة جو') || query.includes('goroutine') || /(^|\s)go(\s|$|[!?.,])/i.test(query) || /(^|\s)جو(\s|$)/.test(query)) {
    return buildTopicReply(topicKnowledge.go, query)
  }

  // Swift
  if (query.includes('swift') || query.includes('سويفت') || query.includes('ios') || query.includes('ايفون') || query.includes('آيفون') || query.includes('swiftui')) {
    return buildTopicReply(topicKnowledge.swift, query)
  }

  // Ruby
  if (query.includes('ruby') || query.includes('روبي') || query.includes('rails') || query.includes('ريلز')) {
    return buildTopicReply(topicKnowledge.ruby, query)
  }

  // Rust
  if (query.includes('rust') || query.includes('رست') || query.includes('راست') || query.includes('cargo') || query.includes('borrow checker')) {
    return buildTopicReply(topicKnowledge.rust, query)
  }

  // Dart
  if (query.includes('dart') || query.includes('دارت')) {
    return buildTopicReply(topicKnowledge.dart, query)
  }

  // R
  if (query.includes('احصاء') || query.includes('إحصاء') || query.includes('ggplot') || /(^|\s|بـ|في\s?)(r|آر|ار)(\s|$|[!?.,])/i.test(query)) {
    return buildTopicReply(topicKnowledge.r, query)
  }

  // PowerShell (قبل Bash لتفادي تطابق كلمة shell)
  if (query.includes('powershell') || query.includes('باورشيل') || query.includes('باور شيل') || query.includes('cmdlet')) {
    return buildTopicReply(topicKnowledge.powershell, query)
  }

  // Bash
  if (!query.includes('powershell') && (query.includes('bash') || query.includes('باش') || query.includes('shell') || query.includes('لينكس') || query.includes('linux') || query.includes('ترمنال') || query.includes('طرفية'))) {
    return buildTopicReply(topicKnowledge.bash, query)
  }

  // Lua
  if (query.includes('lua') || query.includes('لوا') || query.includes('roblox') || query.includes('روبلوكس')) {
    return buildTopicReply(topicKnowledge.lua, query)
  }

  // Scala
  if (query.includes('scala') || query.includes('سكالا') || query.includes('spark') || query.includes('بيانات ضخمة')) {
    return buildTopicReply(topicKnowledge.scala, query)
  }

  // C (اللغة الأصلية)
  if (/(^|\s)(لغة c|لغة سي|برمجة c|كود c|تعلم c)(\s|$|[!?.,])/i.test(query) || (query.includes('لغة سي') && !query.includes('بلس') && !query.includes('شارب'))) {
    return buildTopicReply(topicKnowledge.c, query)
  }

  // Elixir
  if (query.includes('elixir') || query.includes('إليكسير') || query.includes('اليكسير') || query.includes('phoenix') || query.includes('erlang')) {
    return buildTopicReply(topicKnowledge.elixir, query)
  }

  // Haskell
  if (query.includes('haskell') || query.includes('هاسكل') || query.includes('برمجة وظيفية') || query.includes('functional programming')) {
    return buildTopicReply(topicKnowledge.haskell, query)
  }

  // Julia
  if (query.includes('julia') || query.includes('جوليا') || query.includes('حوسبة علمية')) {
    return buildTopicReply(topicKnowledge.julia, query)
  }

  // Perl
  if (query.includes('perl') || query.includes('بيرل') || query.includes('regex')) {
    return buildTopicReply(topicKnowledge.perl, query)
  }

  // 5. مطابقة لغات العالم المنطوقة
  if (query.includes('انجليزي') || query.includes('إنجليزي') || query.includes('english')) {
    return buildTopicReply(topicKnowledge.english, query)
  }

  if (query.includes('اسباني') || query.includes('إسباني') || query.includes('spanish') || query.includes('español')) {
    return buildTopicReply(topicKnowledge.spanish, query)
  }

  if (query.includes('فرنسي') || query.includes('فرنسية') || query.includes('french') || query.includes('français')) {
    return buildTopicReply(topicKnowledge.french, query)
  }

  if (query.includes('الماني') || query.includes('ألماني') || query.includes('german') || query.includes('deutsch')) {
    return buildTopicReply(topicKnowledge.german, query)
  }

  if (query.includes('ايطالي') || query.includes('إيطالي') || query.includes('italian') || query.includes('italiano')) {
    return buildTopicReply(topicKnowledge.italian, query)
  }

  if (query.includes('تركي') || query.includes('تركية') || query.includes('turkish') || query.includes('türkçe')) {
    return buildTopicReply(topicKnowledge.turkish, query)
  }

  if (query.includes('لغات العالم') || query.includes('لغة منطوقة') || query.includes('تعلم لغة')) {
    return buildTopicReply(topicKnowledge.world_languages, query)
  }

  // 6. رد ذكي ومفيد لأي استفسار آخر مع توجيه ذكي
  return `### 💡 إجابة عن استفسارك: "${userQuestion.slice(0, 60)}"

يسعدني مساعدتك! في منصة كود التعليمية:

1. **الأساس والمفهوم:**
   أي مسار أو مشكلة برمجية تواجهها تبدأ بفهم الهدف المطلوب، وتجربة كود بسيط معزول للتأكد من طريقة عمله.

2. **الدورات المتاحة التي تغطي استفسارك:**
   • يمكنك البحث في مربع البحث أعلى مكتبة الدورات لاختيار أي لغة من بين الـ 30 لغة المتوفرة.
   • كل كتاب يقدم لك **188 درسًا** مع أمثلة كود حقيقية وشرح عربي تفصيلي.
   • يتوفر اختبار فوري من **10 أسئلة متخصصة** في نهاية كل كتاب لتقييم مستواك.

إذا كنت تريد كودًا محددًا بلغة معينة (مثل **Python, JavaScript, C++, Rust, Go, Flutter, SQL** وغيرها)، اذكر اسم اللغة في رسالتك وسأكتب لك الكود جاهزًا ومشروحًا فورًا! 💻✨`
}

function buildTopicReply(topic, query) {
  let langTag = 'javascript'
  const nameLower = topic.name.toLowerCase()
  if (nameLower.includes('python')) langTag = 'python'
  else if (nameLower.includes('c++')) langTag = 'cpp'
  else if (nameLower.includes('c#')) langTag = 'csharp'
  else if (nameLower === 'c') langTag = 'c'
  else if (nameLower.includes('sql') || nameLower.includes('postgres')) langTag = 'sql'
  else if (nameLower.includes('go')) langTag = 'go'
  else if (nameLower.includes('rust')) langTag = 'rust'
  else if (nameLower.includes('kotlin')) langTag = 'kotlin'
  else if (nameLower.includes('swift')) langTag = 'swift'
  else if (nameLower.includes('php')) langTag = 'php'
  else if (nameLower.includes('ruby')) langTag = 'ruby'
  else if (nameLower.includes('java') && !nameLower.includes('script')) langTag = 'java'
  else if (nameLower.includes('html')) langTag = 'html'
  else if (nameLower.includes('css')) langTag = 'css'
  else if (nameLower.includes('bash')) langTag = 'bash'
  else if (nameLower.includes('lua')) langTag = 'lua'
  else if (nameLower.includes('scala')) langTag = 'scala'
  else if (nameLower.includes('elixir')) langTag = 'elixir'
  else if (nameLower.includes('haskell')) langTag = 'haskell'
  else if (nameLower.includes('julia')) langTag = 'julia'
  else if (nameLower.includes('perl')) langTag = 'perl'
  else if (nameLower.includes('powershell')) langTag = 'powershell'
  else if (nameLower.includes('typescript')) langTag = 'typescript'
  else if (nameLower.includes('dart') || nameLower.includes('flutter')) langTag = 'dart'
  else if (nameLower.includes('r') && nameLower.length === 1) langTag = 'r'

  return `### 📌 دليل شامل: **${topic.name}** (${topic.category})

${topic.summary}

#### ✨ أهم المفاهيم الأساسية:
${topic.concepts.map(c => `• ${c}`).join('\n')}

#### 💻 مثال كود تطبيقي:
\`\`\`${langTag}
${topic.example}
\`\`\`

> 💡 **نصيحة منصة كود:** ${topic.tips}

هل تريد مني توضيح سطر معين من الكود، أو كتابة مثال تطبيقي أكبر في **${topic.name}**؟ اسألني فورًا وسأجيبك!`
}
