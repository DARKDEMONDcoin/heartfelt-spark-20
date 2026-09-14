import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { LogoMark } from "@/components/site/LogoMark";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const groups = [
  { label: "المنتج", links: [{ label: "الموظفون", to: "/employees" }, { label: "المزايا", to: "/features" }, { label: "كيف يعمل", to: "/how-it-works" }] },
  { label: "الحلول", links: [{ label: "كل القطاعات", to: "/use-cases" }, { label: "المتاجر", to: "/use-cases" }, { label: "المطاعم", to: "/use-cases" }] },
  { label: "المصادر", links: [{ label: "قصص النجاح", to: "/stories" }, { label: "المدونة", to: "/blog" }, { label: "الأسئلة الشائعة", to: "/faq" }] },
] as const;

export function Nav({ variant = "over" }: { variant?: "over" | "solid" }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  return (
    <header className={cn("stripe-nav", variant === "over" && "is-over")} dir="rtl" onMouseLeave={() => setActive(null)}>
      <nav className="stripe-nav-inner" aria-label="التنقل الرئيسي">
        <Link to="/" className="stripe-nav-brand"><LogoMark size={38} /><span>سهل</span></Link>
        <div className="stripe-nav-links">
          {groups.map((group) => <div key={group.label} onMouseEnter={() => setActive(group.label)}><Button type="button" variant="ghost" aria-expanded={active === group.label} aria-haspopup="menu" onClick={() => setActive((value) => value === group.label ? null : group.label)}>{group.label}<ChevronDown /></Button>{active === group.label && <div className="stripe-nav-popover" role="menu">{group.links.map((item) => <Link key={item.to} to={item.to} role="menuitem" onClick={() => setActive(null)}>{item.label}<span>←</span></Link>)}</div>}</div>)}
          <Link to="/integrations">التكاملات</Link><Link to="/pricing">الأسعار</Link>
        </div>
        <div className="stripe-nav-actions"><Link to="/auth" search={{ mode: "signin" as const }}>دخول</Link><Link to="/auth" search={{ mode: "signup" as const }}>ابدأ الآن <span>←</span></Link></div>
        <Button className="stripe-nav-menu" type="button" variant="ghost" size="icon" onClick={() => setOpen((value) => !value)} aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}>{open ? <X /> : <Menu />}</Button>
      </nav>
      {open && <div className="stripe-mobile-menu"><Link to="/employees" onClick={() => setOpen(false)}>الموظفون<span>←</span></Link><Link to="/features" onClick={() => setOpen(false)}>المزايا<span>←</span></Link><Link to="/how-it-works" onClick={() => setOpen(false)}>كيف يعمل<span>←</span></Link><Link to="/use-cases" onClick={() => setOpen(false)}>الحلول<span>←</span></Link><Link to="/stories" onClick={() => setOpen(false)}>قصص النجاح<span>←</span></Link><Link to="/blog" onClick={() => setOpen(false)}>المدونة<span>←</span></Link><Link to="/integrations" onClick={() => setOpen(false)}>التكاملات<span>←</span></Link><Link to="/pricing" onClick={() => setOpen(false)}>الأسعار<span>←</span></Link><div><Link to="/auth" search={{ mode: "signin" as const }}>دخول</Link><Link to="/auth" search={{ mode: "signup" as const }}>ابدأ الآن</Link></div></div>}
    </header>
  );
}