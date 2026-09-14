import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowUpLeft,
  BarChart3,
  Bot,
  BrainCircuit,
  Check,
  CheckCircle2,
  Clock3,
  Code2,
  Globe2,
  Layers3,
  Loader2,
  LockKeyhole,
  MessageSquareText,
  Play,
  Send,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

import { faqs } from "@/components/site/Faq";
import { Portrait } from "@/components/site/Portrait";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { plans } from "@/data/pricing";
import { team } from "@/data/team";
import approvalsAsset from "@/assets/product/approvals.webp.asset.json";
import brainAsset from "@/assets/product/brain.webp.asset.json";
import dashboardAsset from "@/assets/product/dashboard.webp.asset.json";
import integrationsAsset from "@/assets/product/integrations.webp.asset.json";
import reportsAsset from "@/assets/product/reports.webp.asset.json";
import approvalsVideo from "@/assets/product/approvals-section.webm.asset.json";
import brainVideo from "@/assets/product/brain-section.webm.asset.json";
import dashboardVideo from "@/assets/product/dashboard-section.webm.asset.json";
import integrationsVideo from "@/assets/product/integrations-section.webm.asset.json";
import reportsVideo from "@/assets/product/reports-section.webm.asset.json";

type DemoPhase = "idle" | "thinking" | "draft" | "approved";

const sectors = [
  { id: "ecommerce", label: "المتاجر الإلكترونية", title: "من أول منشور إلى متابعة الطلب، الفريق يعرف ماذا يفعل.", body: "محتوى المنتجات، الحملات، رسائل العملاء وتقارير الأداء تتحرك في مسار واحد دون نسخ ولصق بين الأدوات.", metric: "٧ منصات", metricLabel: "تُدار من مكان واحد", image: dashboardAsset.url },
  { id: "restaurants", label: "المطاعم والكافيهات", title: "حضور يومي وردود أسرع في أوقات الذروة.", body: "سِراج يجهّز المحتوى، ودانا تتابع الرسائل، ونور تنظّم ما يحتاج قرارك قبل النشر.", metric: "٢٤/٧", metricLabel: "فريق حاضر باستمرار", image: approvalsAsset.url },
  { id: "clinics", label: "العيادات", title: "محتوى يبني الثقة وتنظيم يحافظ على وقت الفريق.", body: "خطط توعوية، ردود متسقة، ومراجعة بشرية قبل أي مادة حساسة باسم علامتك.", metric: "خطوة واحدة", metricLabel: "من المسودة إلى الاعتماد", image: brainAsset.url },
  { id: "realestate", label: "العقار والمقاولات", title: "كل فرصة تحصل على المتابعة التي تستحقها.", body: "عروض ومحتوى وتقارير وفرص مؤهلة تنتقل بين الموظفين الرقميين بسياق كامل.", metric: "٦ موظفين", metricLabel: "يعملون كفريق واحد", image: reportsAsset.url },
] as const;

function ProductVideo({ src, poster, label, className = "" }: { src: string; poster: string; label: string; className?: string }) {
  return (
    <figure className={`stripe-product-frame ${className}`}>
      <div className="stripe-browser-bar" aria-hidden="true"><i /><i /><i /><span>app.sahl.ai</span></div>
      <video autoPlay muted loop playsInline preload="metadata" poster={poster} aria-label={label}>
        <source src={src} type="video/webm" />
      </video>
      <figcaption><i /> {label}</figcaption>
    </figure>
  );
}

function SirajDemo() {
  const [prompt, setPrompt] = useState("جهّز حملة لإطلاق منتجنا الجديد الأسبوع القادم");
  const [phase, setPhase] = useState<DemoPhase>("idle");
  const timer = useRef<number | null>(null);

  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);

  function run() {
    if (!prompt.trim() || phase === "thinking") return;
    setPhase("thinking");
    timer.current = window.setTimeout(() => setPhase("draft"), 1100);
  }

  return (
    <div className="stripe-demo" id="siraj-demo">
      <header><span><i /> مساحة عمل سهل</span><strong>محادثة مع سِراج</strong><small>متصل الآن</small></header>
      <div className="stripe-demo-layout">
        <aside>
          <Portrait memberId="sonny" name="سِراج" eager />
          <strong>سِراج</strong><small>مدير السوشيال ميديا</small>
          <ul><li className="is-active">المحادثة</li><li>المهام</li><li>المعرفة</li><li>النتائج</li></ul>
        </aside>
        <div className="stripe-chat">
          <div className="stripe-user-message"><small>أنت</small><p>{prompt}</p></div>
          {phase === "thinking" && <div className="stripe-thinking"><Loader2 /><span>سِراج يراجع عقل العلامة ويقسم الحملة إلى مهام...</span></div>}
          {(phase === "draft" || phase === "approved") && (
            <div className="stripe-agent-message">
              <span><Portrait memberId="sonny" name="سِراج" /><b>سِراج</b><small>الآن</small></span>
              <p>جهّزت خطة إطلاق من ٧ أيام: إعلان تمهيدي، ٣ منشورات، قصة يومية، ورسائل متابعة. صغت المحتوى بنبرة علامتك وحددت أفضل مواعيد النشر.</p>
              <div><span>#إطلاق_جديد</span><span>إنستقرام + فيسبوك</span><span>٧ مواد</span></div>
            </div>
          )}
          {phase === "approved" && <div className="stripe-success"><CheckCircle2 /><span><b>تم اعتماد الخطة</b><small>أضيفت المهام إلى تقويم الفريق</small></span></div>}
          <div className="stripe-composer">
            <label htmlFor="stripe-prompt">اكتب طلبك</label>
            <textarea id="stripe-prompt" rows={2} value={prompt} onChange={(event) => { setPrompt(event.target.value); setPhase("idle"); }} />
            <Button type="button" size="icon" onClick={run} disabled={!prompt.trim() || phase === "thinking"} aria-label="إرسال الطلب">{phase === "thinking" ? <Loader2 className="animate-spin" /> : <Send />}</Button>
          </div>
          {(phase === "draft" || phase === "approved") && <div className="stripe-demo-actions"><Button variant="outline" onClick={() => setPhase("idle")}>تعديل</Button><Button onClick={() => setPhase("approved")} disabled={phase === "approved"}><Check />{phase === "approved" ? "تم الاعتماد" : "اعتماد وجدولة"}</Button></div>}
        </div>
      </div>
    </div>
  );
}

function ScaleGraphic() {
  return <div className="stripe-scale-art" aria-hidden="true"><div className="stripe-scale-core"><span>سهل</span></div>{Array.from({ length: 44 }).map((_, index) => <i key={index} style={{ "--ray": index } as React.CSSProperties}><b /></i>)}</div>;
}

export function EditorialHomepage() {
  const [sector, setSector] = useState(0);
  const currentSector = sectors[sector];

  return (
    <div className="stripe-sahl-home" dir="rtl">
      <section className="stripe-sahl-hero" aria-labelledby="home-title">
        <div className="stripe-sahl-ribbon" aria-hidden="true"><i /><i /><i /></div>
        <div className="stripe-sahl-grid" aria-hidden="true" />
        <div className="stripe-sahl-shell stripe-sahl-hero-inner">
          <div className="stripe-sahl-hero-copy">
            <p className="stripe-eyebrow"><span>جديد</span> فريق عمل عربي يفهم مشروعك</p>
            <h1 id="home-title">البنية التشغيلية<br />لنمو مشروعك.</h1>
            <p>وظّف فريقاً من الموظفين الرقميين يكتب ويصمّم ويردّ ويبيع ويحلّل — من أول مهمة إلى أول نتيجة، داخل مساحة واحدة.</p>
            <div className="stripe-sahl-actions">
              <Link to="/auth" search={{ mode: "signup" as const }}>ابدأ الآن <ArrowLeft /></Link>
              <a href="#siraj-demo">جرّب سِراج <MessageSquareText /></a>
            </div>
            <small><CheckCircle2 /> ١٤ يوماً مجاناً، بدون بطاقة بنكية</small>
          </div>
          <div className="stripe-hero-stage">
            <ProductVideo src={dashboardVideo.url} poster={dashboardAsset.url} label="مساحة عمل سهل الحقيقية" className="is-main" />
            <div className="stripe-floating-task"><span><Sparkles /></span><div><small>مهمة اكتملت الآن</small><b>خطة محتوى الأسبوع</b></div><CheckCircle2 /></div>
            <div className="stripe-floating-team">{team.slice(0, 4).map((member) => <Portrait key={member.id} memberId={member.id} name={member.name} />)}<span><b>٦</b><small>موظفين متاحين</small></span></div>
          </div>
        </div>
      </section>

      <section className="stripe-trust" aria-label="مجالات عمل سهل"><div className="stripe-sahl-shell"><p>فريق واحد يشغّل دورة العمل كاملة</p><div>{["المحتوى", "المبيعات", "خدمة العملاء", "التصميم", "التحليلات", "التنظيم"].map((item, i) => <span key={item}><b>٠{i + 1}</b>{item}</span>)}</div></div></section>

      <section className="stripe-solutions">
        <div className="stripe-sahl-shell">
          <header className="stripe-section-intro"><span>منظومة عمل متكاملة</span><h2>حلول مرنة لكل خطوة في مشروعك.</h2><p>ابدأ بموظف واحد، أو اجمع الفريق كله. كل موظف يعرف سياق علامتك ويسلّم العمل للموظف التالي دون أن تعيد شرح أي شيء.</p></header>
          <div className="stripe-bento">
            <article className="stripe-bento-card is-wide"><div className="stripe-card-copy"><Bot /><span>الإدارة اليومية</span><h3>أعطِ الأمر مرة واحدة.<br />والفريق يتولى التنفيذ.</h3><p>محادثة عربية واحدة تتحول إلى مهام، محتوى، تصميم، مراجعة وجدولة.</p><Link to="/how-it-works">شاهد كيف يعمل <ArrowLeft /></Link></div><ProductVideo src={dashboardVideo.url} poster={dashboardAsset.url} label="لوحة العمل" /></article>
            <article className="stripe-bento-card"><div className="stripe-card-copy"><MessageSquareText /><span>المحتوى والنشر</span><h3>محتوى بصوت علامتك، لا بصوت آلة.</h3><p>سِراج يتعلم أسلوبك ويكتب لكل منصة بصيغتها.</p><Link to="/employees/$id" params={{ id: "sonny" }}>تعرّف إلى سِراج <ArrowLeft /></Link></div><div className="stripe-mini-feed"><i /><p>عرض الأسبوع جاهز ✦</p><span>Instagram</span><span>Facebook</span></div></article>
            <article className="stripe-bento-card"><div className="stripe-card-copy"><ShieldCheck /><span>المراجعة والاعتماد</span><h3>الفريق ينجز.<br />وأنت صاحب القرار.</h3><p>راجع كل مخرج وعدّله أو اعتمده قبل أن يصل إلى عملائك.</p><Link to="/app/approvals">افتح الموافقات <ArrowLeft /></Link></div><img src={approvalsAsset.url} alt="واجهة الموافقات في سهل" loading="lazy" /></article>
            <article className="stripe-bento-card is-dark"><div className="stripe-card-copy"><BrainCircuit /><span>عقل العلامة</span><h3>معرفة مشروعك تبقى مع الفريق كله.</h3><p>النبرة، الجمهور، المنتجات، والملاحظات تتحول إلى ذاكرة تشغيلية مشتركة.</p><Link to="/app/brain">استكشف عقل العلامة <ArrowLeft /></Link></div><div className="stripe-brain-map"><b>علامتك</b>{["النبرة", "العملاء", "المنتجات", "الأهداف"].map((x) => <span key={x}>{x}</span>)}</div></article>
          </div>
        </div>
      </section>

      <section className="stripe-scale">
        <div className="stripe-sahl-shell"><header><span>مصمّمة للنمو</span><h2>العمود الفقري<br />لعملك اليومي.</h2></header><div className="stripe-metrics"><article><strong>٦</strong><span>موظفين رقميين متخصصين</span></article><article><strong>٢٤/٧</strong><span>تشغيل ومتابعة مستمرة</span></article><article><strong>٧</strong><span>منصات نشر من مكان واحد</span></article><article><strong>١٥+</strong><span>مصدر بيانات قابل للربط</span></article></div><ScaleGraphic /></div>
      </section>

      <section className="stripe-platform">
        <div className="stripe-sahl-shell"><div className="stripe-platform-copy"><span>منصة واحدة، فريق كامل</span><h2>موثوقة، مترابطة،<br />وجاهزة لطريقتك في العمل.</h2><p>اربط حساباتك، ثبّت قواعد الموافقة، وشاهد كل خطوة ينفّذها الفريق من مساحة عمل واضحة.</p><div className="stripe-sahl-actions"><Link to="/app">افتح مساحة التجربة <ArrowLeft /></Link><Link to="/security">اعرف المزيد عن الأمان</Link></div></div><ProductVideo src={integrationsVideo.url} poster={integrationsAsset.url} label="تكاملات سهل" className="is-platform" /><div className="stripe-platform-features"><article><Workflow /><b>يتصل بأدواتك</b><p>حسابات النشر والتحليلات ومواقعك في تدفق واحد.</p></article><article><LockKeyhole /><b>تحكم واضح</b><p>المهام الحساسة تنتظر موافقتك قبل التنفيذ.</p></article><article><Code2 /><b>يتوسع معك</b><p>أضف موظفين ومصادر جديدة حين يكبر العمل.</p></article></div></div>
      </section>

      <section className="stripe-live-product"><div className="stripe-sahl-shell"><header className="stripe-section-intro"><span>جرّب بنفسك</span><h2>اكتب ما تحتاجه.<br />وشاهد سِراج يبدأ العمل.</h2><p>هذه تجربة تفاعلية وليست صورة دعائية: اكتب الطلب، استلم المسودة، ثم اعتمدها لتدخل جدول الفريق.</p></header><SirajDemo /></div></section>

      <section className="stripe-sectors"><div className="stripe-sahl-shell"><header className="stripe-section-intro"><span>لكل نوع مشروع</span><h2>نفس الفريق.<br />سياق يناسب نشاطك.</h2></header><div className="stripe-sector-tabs" role="tablist" aria-label="اختر نوع النشاط">{sectors.map((item, index) => <Button key={item.id} type="button" variant="ghost" role="tab" aria-selected={sector === index} className={sector === index ? "is-active" : ""} onClick={() => setSector(index)}>{item.label}</Button>)}</div><div className="stripe-sector-panel"><div><span>{currentSector.label}</span><h3>{currentSector.title}</h3><p>{currentSector.body}</p><strong>{currentSector.metric}</strong><small>{currentSector.metricLabel}</small><Link to="/use-cases/$id" params={{ id: currentSector.id }}>شاهد الحل الكامل <ArrowLeft /></Link></div><figure><img src={currentSector.image} alt={`واجهة سهل لقطاع ${currentSector.label}`} loading="lazy" /></figure></div></div></section>

      <section className="stripe-real-scenes"><div className="stripe-sahl-shell"><header className="stripe-section-intro"><span>المنتج كما هو</span><h2>شاشات حقيقية.<br />نتائج يمكنك متابعتها.</h2></header><div className="stripe-scenes-grid"><Link to="/app/approvals"><ProductVideo src={approvalsVideo.url} poster={approvalsAsset.url} label="الموافقات" /><h3>راجع واعتمد قبل النشر.</h3><p>كل ما أنجزه الفريق مرتب في طابور واضح.</p></Link><Link to="/app/brain"><ProductVideo src={brainVideo.url} poster={brainAsset.url} label="عقل العلامة" /><h3>ابنِ ذاكرة مشروعك.</h3><p>مصدر معرفة واحد يستخدمه كل موظف.</p></Link><Link to="/app/reports"><ProductVideo src={reportsVideo.url} poster={reportsAsset.url} label="التقارير" /><h3>اعرف ماذا تحقق.</h3><p>تحليلات وتقارير قابلة للقراءة والمشاركة.</p></Link></div></div></section>

      <section className="stripe-stories"><div className="stripe-sahl-shell"><header><span>قصص من سوقنا</span><h2>أعمال صغيرة.<br />طموح كبير.</h2></header><blockquote><Sparkles /><p>“بدلاً من التنقل بين خمس أدوات ومتابعة كل تفصيلة بنفسي، أصبحت أرسل المطلوب مرة واحدة وأراجع النتيجة فقط.”</p><footer><b>صاحبة متجر إلكتروني</b><span>الرياض، السعودية</span></footer></blockquote><div className="stripe-story-stats"><span><BarChart3 /><b>٣×</b><small>محتوى أكثر انتظاماً</small></span><span><Clock3 /><b>١٢ ساعة</b><small>موفّرة كل أسبوع</small></span><span><Globe2 /><b>٤ قنوات</b><small>تعمل بصوت واحد</small></span></div></div></section>

      <section className="stripe-pricing"><div className="stripe-sahl-shell"><header className="stripe-section-intro"><span>خطط واضحة</span><h2>ابدأ بحجمك اليوم.<br />وكبّر الفريق وقتما تحتاج.</h2></header><div className="stripe-plan-grid">{plans.map((plan) => <article key={plan.id} className={plan.highlight ? "is-featured" : ""}>{plan.highlight && <span className="stripe-plan-tag">الأكثر اختياراً</span>}<small>{plan.tag}</small><h3>{plan.name}</h3><div>{plan.monthly ? <><strong>{plan.monthly.toLocaleString("ar-SA")}</strong><span>ر.س / شهرياً</span></> : <strong className="is-text">حسب الطلب</strong>}</div><p>{plan.desc}</p><ul>{plan.perks.slice(0, 5).map((perk) => <li key={perk}><Check />{perk}</li>)}</ul>{plan.monthly ? <Link to="/auth" search={{ mode: "signup" as const }}>{plan.cta}<ArrowLeft /></Link> : <Link to="/contact">{plan.cta}<ArrowLeft /></Link>}</article>)}</div></div></section>

      <section className="stripe-resources"><div className="stripe-sahl-shell"><header><span>من سهل</span><h2>أفكار تساعدك<br />على العمل بذكاء.</h2></header><div><Link to="/blog"><span>دليل عملي</span><BrainCircuit /><h3>كيف تبني عقل علامة يعرفه فريقك كله؟</h3><b>اقرأ الدليل <ArrowUpLeft /></b></Link><Link to="/stories"><span>قصص نجاح</span><Layers3 /><h3>كيف تستخدم المشاريع العربية موظفيها الرقميين؟</h3><b>شاهد القصص <ArrowUpLeft /></b></Link><Link to="/security"><span>الثقة والأمان</span><ShieldCheck /><h3>أنت تتحكم في الحسابات والموافقات دائماً.</h3><b>مركز الأمان <ArrowUpLeft /></b></Link></div></div></section>

      <section className="stripe-faq"><div className="stripe-sahl-shell"><header className="stripe-section-intro"><span>أسئلة شائعة</span><h2>كل ما تحتاج معرفته<br />قبل أن يبدأ الفريق.</h2></header><Accordion type="single" collapsible>{faqs.slice(0, 7).map((item, index) => <AccordionItem key={item.q} value={`faq-${index}`}><AccordionTrigger>{item.q}</AccordionTrigger><AccordionContent>{item.a}</AccordionContent></AccordionItem>)}</Accordion></div></section>

      <section className="stripe-final-cta"><div className="stripe-final-ribbon" aria-hidden="true" /><div className="stripe-sahl-shell"><span>فريقك جاهز</span><h2>ابدأ اليوم.<br />ودع العمل يتحرك.</h2><p>كوّن فريقك الرقمي في دقائق، وابدأ بأول مهمة مجاناً.</p><div className="stripe-sahl-actions"><Link to="/auth" search={{ mode: "signup" as const }}>ابدأ ١٤ يوماً مجاناً <ArrowLeft /></Link><Link to="/contact">تحدث معنا</Link></div><small><CheckCircle2 /> بدون بطاقة بنكية · إلغاء في أي وقت</small></div></section>
      <SiteFooter />
    </div>
  );
}