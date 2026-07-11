import React, { useState, useRef, useLayoutEffect } from "react";
import {
  Inbox,
  CalendarCheck,
  BellRing,
  ClipboardList,
  Check,
  Globe,
  Instagram,
  MessageCircle,
  Phone,
  ArrowRight,
  TrendingUp,
  Clock,
  CircleDot,
  Leaf,
  CreditCard,
  ShieldCheck,
} from "lucide-react";

const c = {
  bg: "#F6F2E9",
  surface: "#FFFFFF",
  surfaceSoft: "#FBF8F2",
  ink: "#292A22",
  inkSoft: "#6B6C5F",
  inkFaint: "#A6A692",
  sage: "#3E4E3C",
  sageSoft: "#DEE5D6",
  sageLine: "#B9C7AE",
  gold: "#AD8339",
  goldSoft: "#F1E4C7",
  line: "#E7E1D2",
};

const clinicStages = [
  { id: 0, label: "Inbound", icon: Inbox },
  { id: 1, label: "Scheduled", icon: CalendarCheck },
  { id: 2, label: "Reminded", icon: BellRing },
  { id: 3, label: "Briefed", icon: ClipboardList },
];

const patientStages = [
  { id: 0, label: "Discover", icon: Leaf },
  { id: 1, label: "Choose a time", icon: CalendarCheck },
  { id: 2, label: "Pay & confirm", icon: CreditCard },
  { id: 3, label: "Intake form", icon: ClipboardList },
];

function Eyebrow({ children }) {
  return (
    <div
      className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-medium mb-3"
      style={{ color: c.gold }}
    >
      <CircleDot size={11} strokeWidth={2.5} />
      {children}
    </div>
  );
}

function SourceBadge({ kind }) {
  const map = {
    Website: { icon: Globe, color: c.sage },
    Instagram: { icon: Instagram, color: c.gold },
    WhatsApp: { icon: MessageCircle, color: c.sage },
    Phone: { icon: Phone, color: c.inkSoft },
    Facebook: { icon: Globe, color: "#1877F2" },
  };
  const { icon: Icon, color } = map[kind];
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full"
      style={{ background: c.surfaceSoft, color, border: `1px solid ${c.line}` }}
    >
      <Icon size={12} />
      {kind}
    </span>
  );
}

function Stepper({ stages, active, setActive }) {
  return (
    <div className="flex items-center mb-8">
      {stages.map((s, i) => {
        const Icon = s.icon;
        const isActive = i === active;
        const isDone = i < active;
        return (
          <React.Fragment key={s.id}>
            <button onClick={() => setActive(i)} className="flex flex-col items-center gap-1.5 shrink-0">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                style={{
                  background: isActive ? c.sage : isDone ? c.sageSoft : c.surface,
                  border: `1.5px solid ${isActive ? c.sage : isDone ? c.sageLine : c.line}`,
                  color: isActive ? c.surface : isDone ? c.sage : c.inkFaint,
                }}
              >
                {isDone ? <Check size={16} /> : <Icon size={16} />}
              </div>
              <p className="text-xs font-semibold text-center" style={{ color: isActive ? c.ink : c.inkFaint }}>
                {s.label}
              </p>
            </button>
            {i < stages.length - 1 && (
              <div className="flex-1 h-px mx-1 mb-5" style={{ background: i < active ? c.sageLine : c.line }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ---------- CLINIC VIEW SCREENS ---------- */

function ScreenInbox({ addToast }) {
  const leads = [
    { name: "Ananya Reddy", kind: "Instagram", note: "Saw your reel on insulin resistance — do you take new patients?", time: "2 min ago", status: "new" },
    { name: "Karthik Rao", kind: "Website", note: "Enquiry form: interested in longevity assessment package", time: "18 min ago", status: "booked" },
    { name: "Priya Menon", kind: "WhatsApp", note: "Following up — can I come this Tuesday afternoon?", time: "1 hr ago", status: "action" },
    { name: "Farhan Ali", kind: "Phone", note: "Missed call, voicemail: asking about thyroid consult", time: "3 hr ago", status: "new" },
    { name: "Deepa Sharma", kind: "Facebook", note: "Facebook Lead Ad: 'Tell me more about the longevity programme'", time: "5 hr ago", status: "new" },
  ];
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm mb-1" style={{ color: c.inkSoft }}>
        Every channel lands in one queue — nothing waits in a separate inbox.
      </p>
      {leads.map((l, i) => (
        <div key={i} className="rounded-2xl p-4 flex items-start justify-between gap-4"
          style={{ background: l.status === "action" ? c.goldSoft : c.surfaceSoft, border: `1px solid ${l.status === "action" ? "#E3CE9C" : c.line}` }}>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="font-semibold" style={{ color: c.ink }}>{l.name}</span>
              <SourceBadge kind={l.kind} />
              <span className="text-xs" style={{ color: c.inkFaint }}>{l.time}</span>
            </div>
            <p className="text-sm" style={{ color: c.inkSoft }}>{l.note}</p>
          </div>
          {l.status === "action" && (
            <button onClick={() => addToast(`${l.name} scheduled successfully`)} className="shrink-0 text-xs font-semibold px-3 py-2 rounded-full whitespace-nowrap" style={{ background: c.sage, color: c.surface }}>
              Confirm and schedule
            </button>
          )}
          {l.status === "booked" && (
            <span className="shrink-0 text-xs font-semibold px-3 py-2 rounded-full whitespace-nowrap" style={{ background: c.sageSoft, color: c.sage }}>
              Self-booked ✓
            </span>
          )}
          {l.status === "new" && (
            <button onClick={() => addToast(`Booking link sent to ${l.name}`)} className="shrink-0 text-xs font-medium px-3 py-2 rounded-full whitespace-nowrap" style={{ background: "transparent", color: c.inkSoft, border: `1px solid ${c.line}` }}>
              Send booking link
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

function ScreenSchedule() {
  const days = ["MON", "TUE", "WED", "THU", "FRI"];
  const times = ["10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:30 PM", "5:30 PM"];
  return (
    <div className="flex flex-col md:flex-row gap-5">
      <div className="flex-1">
        <p className="text-sm mb-3" style={{ color: c.inkSoft }}>
          Two different paths, same calendar: Priya was fit into a slot by the clinic,
          Karthik picked and paid for his own.
        </p>
        <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${c.line}`, background: c.surfaceSoft }}>
          <div className="grid grid-cols-5 text-center text-xs font-semibold py-2" style={{ color: c.inkSoft, borderBottom: `1px solid ${c.line}` }}>
            {days.map((d) => <div key={d}>{d}</div>)}
          </div>
          <div className="grid grid-cols-5">
            {days.map((d, di) => (
              <div key={d} className="flex flex-col gap-1 p-1.5" style={{ borderRight: di < 4 ? `1px solid ${c.line}` : "none" }}>
                {times.map((t) => {
                  const isPriya = d === "TUE" && t === "4:30 PM";
                  const isKarthik = d === "THU" && t === "11:00 AM";
                  return (
                    <div key={t} className="text-[11px] rounded-md py-1.5 text-center"
                      style={
                        isPriya ? { background: c.sage, color: c.surface, fontWeight: 600 } :
                        isKarthik ? { background: c.gold, color: c.surface, fontWeight: 600 } :
                        { color: c.inkFaint }
                      }>
                      {isPriya ? "Priya M." : isKarthik ? "Karthik R." : t}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-4 mt-3 text-xs" style={{ color: c.inkSoft }}>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: c.sage }} /> Clinic-confirmed (follow-up)</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: c.gold }} /> Self-booked and paid (new patient)</span>
        </div>
      </div>
      <div className="md:w-64 shrink-0">
        <div className="rounded-2xl p-4" style={{ background: c.surface, border: `1px solid ${c.line}` }}>
          <p className="text-xs uppercase tracking-wide font-semibold mb-3" style={{ color: c.gold }}>Karthik Rao — new patient</p>
          <p className="text-sm mb-3" style={{ color: c.inkSoft }}>
            Initial consult · 60 min<br />Thu, 11:00 AM
          </p>
          <div className="flex items-center gap-2 text-xs font-medium px-2.5 py-1.5 rounded-full w-fit mb-3" style={{ background: c.goldSoft, color: c.gold }}>
            <Check size={12} /> Advance paid · ₹2,000 online
          </div>
          <p className="text-xs" style={{ color: c.inkFaint }}>
            Booked himself, no clinic staff involved until this point.
          </p>
        </div>
      </div>
    </div>
  );
}

function ScreenReminders() {
  const touchpoints = [
    { when: "T − 48 hrs", what: "WhatsApp: booking confirmed + intake form link", state: "Read" },
    { when: "T − 24 hrs", what: "Intake form nudge — 2 of 6 sections still pending", state: "Sent" },
    { when: "T − 2 hrs", what: "Reminder + clinic directions + parking note", state: "Delivered" },
  ];
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-1">
        <p className="text-sm mb-4" style={{ color: c.inkSoft }}>
          Each touchpoint fires on its own, timed backward from the appointment —
          nobody has to remember to send it.
        </p>
        <div className="flex flex-col">
          {touchpoints.map((t, i) => (
            <div key={i} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-2.5 h-2.5 rounded-full mt-1.5" style={{ background: c.sage }} />
                {i < touchpoints.length - 1 && <div className="w-px flex-1" style={{ background: c.line }} />}
              </div>
              <div className="pb-6">
                <p className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: c.gold }}>{t.when}</p>
                <p className="text-sm mb-1" style={{ color: c.ink }}>{t.what}</p>
                <span className="text-xs" style={{ color: c.inkFaint }}>{t.state}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="md:w-72 shrink-0">
        <div className="rounded-2xl p-4" style={{ background: "#EAF1E4", border: `1px solid ${c.sageLine}` }}>
          <p className="text-xs font-semibold mb-3" style={{ color: c.sage }}>WhatsApp preview</p>
          <div className="rounded-xl p-3 space-y-3" style={{ background: c.surface }}>
            <div className="flex items-center gap-2 pb-2" style={{ borderBottom: `1px solid ${c.line}` }}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: c.sage }}>E</div>
              <div>
                <p className="text-xs font-semibold" style={{ color: c.ink }}>Empathia Clinic</p>
                <p className="text-[10px]" style={{ color: c.inkFaint }}>online</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="relative max-w-[90%] rounded-2xl rounded-tr-sm p-3 text-sm" style={{ background: "#DCF8C6", color: c.ink }}>
                <p>Hi Priya, looking forward to seeing you Tue at 4:30 PM at Empathia. Two quick sections left in your intake form — takes about 3 minutes: [link]. See you soon 🌿</p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-[10px]" style={{ color: c.inkFaint }}>4:02 PM</span>
                  <Check size={12} strokeWidth={3} style={{ color: c.sage }} />
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs mt-3 text-center" style={{ color: c.inkFaint }}>Sent automatically · read 6 min later</p>
        </div>
      </div>
    </div>
  );
}

function ScreenBrief() {
  return (
    <div>
      <p className="text-sm mb-4" style={{ color: c.inkSoft }}>
        Two minutes to read, before Dr. Sudeepta walks in — she meets Priya
        already knowing the story so far.
      </p>
      <div className="rounded-2xl p-5" style={{ background: c.surfaceSoft, border: `1px solid ${c.line}` }}>
        <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
          <div>
            <p className="font-semibold text-lg" style={{ color: c.ink }}>Priya Menon, 41</p>
            <p className="text-sm" style={{ color: c.inkSoft }}>Follow-up · 3rd visit · metabolic reset programme, week 6</p>
          </div>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: c.goldSoft, color: c.gold }}>1 flag needs attention</span>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs uppercase tracking-wide font-semibold mb-2" style={{ color: c.inkFaint }}>Since last visit</p>
            <ul className="text-sm space-y-1.5" style={{ color: c.ink }}>
              <li>· Reports better sleep, 3 of 5 nights</li>
              <li>· Stopped evening walks — travel for work</li>
              <li>· Completed fasting insulin + HbA1c panel</li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide font-semibold mb-2" style={{ color: c.inkFaint }}>Trend to flag</p>
            <div className="flex items-start gap-2 text-sm rounded-lg p-2.5" style={{ background: c.goldSoft, color: c.ink }}>
              <TrendingUp size={16} className="mt-0.5 shrink-0" style={{ color: c.gold }} />
              <span>Fasting insulin up 12% since March — still in range, watch trajectory</span>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-xs uppercase tracking-wide font-semibold mb-2" style={{ color: c.inkFaint }}>Suggested discussion points</p>
          <ul className="text-sm space-y-1.5" style={{ color: c.ink }}>
            <li>· Revisit evening movement now that travel has resumed</li>
            <li>· Confirm supplement adherence — magnesium logged inconsistently</li>
          </ul>
        </div>
        <div className="flex items-center gap-2 text-xs pt-3" style={{ color: c.inkFaint, borderTop: `1px solid ${c.line}` }}>
          <Clock size={12} /> Compiled from intake form, wearable sync, and last 2 visit notes
        </div>
      </div>
    </div>
  );
}

/* ---------- PATIENT VIEW SCREENS (Karthik Rao, new patient) ---------- */

function ScreenDiscover({ addToast }) {
  return (
    <div>
      <p className="text-sm mb-4" style={{ color: c.inkSoft }}>
        Arjun taps the link in Empathia's Instagram bio — this is the first thing he sees.
      </p>
      <div className="rounded-2xl p-8 text-center" style={{ background: c.surfaceSoft, border: `1px solid ${c.line}` }}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: c.sageSoft }}>
          <Leaf size={22} style={{ color: c.sage }} />
        </div>
        <p style={{ fontFamily: "Fraunces, serif", color: c.ink }} className="text-xl font-medium mb-2">
          Empathia Functional Health
        </p>
        <p className="text-sm mb-6 max-w-sm mx-auto" style={{ color: c.inkSoft }}>
          Personalised, evidence-based care for chronic lifestyle and metabolic
          conditions — prevention first, complementing your existing doctors, not replacing them.
        </p>
        <div className="flex flex-col gap-2 text-sm max-w-xs mx-auto mb-6 text-left">
          <span style={{ color: c.ink }}>✓ Root-cause, not just symptom management</span>
          <span style={{ color: c.ink }}>✓ Led by Dr. Sudeepta Rao, MD, FMCP-M</span>
          <span style={{ color: c.ink }}>✓ 60-minute unhurried first consultation</span>
        </div>
        <button onClick={() => addToast("Opening booking calendar...")} className="text-sm font-semibold px-5 py-2.5 rounded-full" style={{ background: c.sage, color: c.surface }}>
          Book a consultation
        </button>
      </div>
    </div>
  );
}

function ScreenChooseTime({ addToast }) {
  const slots = [
    { day: "Wed", date: "9 Jul", time: "3:00 PM" },
    { day: "Thu", date: "10 Jul", time: "11:00 AM" },
    { day: "Thu", date: "10 Jul", time: "5:30 PM" },
    { day: "Fri", date: "11 Jul", time: "10:00 AM" },
  ];
  const [selectedSlot, setSelectedSlot] = useState(1);
  const selected = slots[selectedSlot];

  return (
    <div>
      <p className="text-sm mb-4" style={{ color: c.inkSoft }}>
        Arjun picks his own slot from real availability — nothing is assigned to him.
      </p>
      <p className="text-xs uppercase tracking-wide font-semibold mb-3" style={{ color: c.inkFaint }}>
        Initial Longevity Consultation · 60 min
      </p>
      <div className="grid grid-cols-2 gap-2.5 mb-5">
        {slots.map((s, i) => (
          <button key={i} onClick={() => setSelectedSlot(i)} className="rounded-xl p-3 text-left"
            style={{
              background: i === selectedSlot ? c.sage : c.surfaceSoft,
              border: `1.5px solid ${i === selectedSlot ? c.sage : c.line}`,
              color: i === selectedSlot ? c.surface : c.ink,
            }}>
            <p className="text-xs font-semibold" style={{ opacity: 0.85 }}>{s.day}, {s.date}</p>
            <p className="text-sm font-semibold">{s.time}</p>
          </button>
        ))}
      </div>
      <button onClick={() => addToast(`Slot confirmed: ${selected.day}, ${selected.time}`)} className="text-sm font-semibold px-5 py-2.5 rounded-full" style={{ background: c.sage, color: c.surface }}>
        Continue with {selected.day}, {selected.time}
      </button>
    </div>
  );
}
function ScreenPay({ addToast }) {
  return (
    <div>
      <p className="text-sm mb-4" style={{ color: c.inkSoft }}>
        A small advance confirms the slot and reduces no-shows.
      </p>
      <div className="rounded-2xl p-5 max-w-sm" style={{ background: c.surfaceSoft, border: `1px solid ${c.line}` }}>
        <p className="text-xs uppercase tracking-wide font-semibold mb-3" style={{ color: c.inkFaint }}>Order summary</p>
        <div className="flex justify-between text-sm mb-1.5" style={{ color: c.ink }}>
          <span>Initial consultation</span><span>₹3,500</span>
        </div>
        <div className="flex justify-between text-sm mb-1.5" style={{ color: c.inkSoft }}>
          <span>Payable now (advance)</span><span>₹2,000</span>
        </div>
        <div className="flex justify-between text-sm mb-4 pb-4" style={{ color: c.inkFaint, borderBottom: `1px solid ${c.line}` }}>
          <span>Balance at visit</span><span>₹1,500</span>
        </div>
        <button onClick={() => addToast("Processing ₹2,000 payment...")} className="w-full flex items-center justify-center gap-2 text-sm font-semibold px-4 py-3 rounded-full mb-3" style={{ background: c.sage, color: c.surface }}>
          <CreditCard size={15} /> Pay ₹2,000 to confirm
        </button>
        <div className="flex items-center gap-1.5 text-xs justify-center" style={{ color: c.inkFaint }}>
          <ShieldCheck size={12} /> Secured payment · instant confirmation
        </div>
      </div>
    </div>
  );
}

function ScreenIntake({ addToast }) {
  const [complaint, setComplaint] = useState("Ongoing fatigue, family history of diabetes, want a preventive plan...");
  const [meds, setMeds] = useState("Metformin 500mg, Vitamin D3 weekly");
  const [sleep, setSleep] = useState(1);

  return (
    <div>
      <p className="text-sm mb-4" style={{ color: c.inkSoft }}>
        Sent right after payment, and nudged again before the visit if left incomplete.
        Everything Arjun enters here becomes part of his own pre-visit brief.
      </p>
      <div className="rounded-2xl p-5 max-w-md" style={{ background: c.surfaceSoft, border: `1px solid ${c.line}` }}>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-semibold" style={{ color: c.gold }}>Section 2 of 6 — Health background</p>
          <span className="text-xs" style={{ color: c.inkFaint }}>~4 min left</span>
        </div>
        <div className="w-full h-1.5 rounded-full mb-5" style={{ background: c.line }}>
          <div className="h-1.5 rounded-full" style={{ width: "33%", background: c.sage }} />
        </div>
        <div className="flex flex-col gap-4 text-sm">
          <label className="flex flex-col gap-1.5">
            <span style={{ color: c.ink }}>What brings you to Empathia today?</span>
            <textarea
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              className="rounded-lg p-2.5 w-full text-sm bg-transparent resize-none outline-none focus:ring-2 focus:ring-offset-1"
              style={{ background: c.surface, border: `1px solid ${c.line}`, color: c.ink, fontFamily: "inherit" }}
              rows={2}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span style={{ color: c.ink }}>Current medications or supplements</span>
            <textarea
              value={meds}
              onChange={(e) => setMeds(e.target.value)}
              className="rounded-lg p-2.5 w-full text-sm bg-transparent resize-none outline-none focus:ring-2 focus:ring-offset-1"
              style={{ background: c.surface, border: `1px solid ${c.line}`, color: c.ink, fontFamily: "inherit" }}
              rows={2}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span style={{ color: c.ink }}>How would you rate your sleep quality?</span>
            <div className="flex gap-1.5">
              {["Poor", "Fair", "OK", "Good", "Great"].map((l, i) => (
                <label key={l} className="flex-1 text-center text-xs py-1.5 rounded-md cursor-pointer"
                  style={i === sleep ? { background: c.sage, color: c.surface, fontWeight: 600 } : { background: c.surface, color: c.inkFaint, border: `1px solid ${c.line}` }}>
                  <input type="radio" name="sleep" className="sr-only" checked={i === sleep} onChange={() => setSleep(i)} />
                  {l}
                </label>
              ))}
            </div>
          </label>
        </div>
        <button onClick={() => addToast("Progress saved")} className="mt-5 text-sm font-semibold px-4 py-2.5 rounded-full" style={{ background: c.sage, color: c.surface }}>
          Save and continue
        </button>
      </div>
    </div>
  );
}

const clinicScreens = [ScreenInbox, ScreenSchedule, ScreenReminders, ScreenBrief];
const patientScreens = [ScreenDiscover, ScreenChooseTime, ScreenPay, ScreenIntake];

export default function PatientJourneyMockup() {
  const [mode, setMode] = useState("clinic");
  const [clinicActive, setClinicActive] = useState(0);
  const [patientActive, setPatientActive] = useState(0);
  const [toasts, setToasts] = useState([]);

  const active = mode === "clinic" ? clinicActive : patientActive;
  const setActive = mode === "clinic" ? setClinicActive : setPatientActive;
  const stages = mode === "clinic" ? clinicStages : patientStages;
  const Screen = (mode === "clinic" ? clinicScreens : patientScreens)[active];

  const addToast = (msg) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, msg }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2200);
  };

  /* ---------- Sliding pill measurement ---------- */
  const containerRef = useRef(null);
  const clinicRef = useRef(null);
  const patientRef = useRef(null);
  const [pillStyle, setPillStyle] = useState({ width: 0, left: 0 });

  useLayoutEffect(() => {
    const update = () => {
      const container = containerRef.current;
      const activeRef = mode === "clinic" ? clinicRef : patientRef;
      if (!container || !activeRef.current) return;

      const cRect = container.getBoundingClientRect();
      const bRect = activeRef.current.getBoundingClientRect();

      setPillStyle({
        width: bRect.width,
        left: bRect.left - cRect.left,
      });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [mode]);

  return (
    <div style={{ background: c.bg, minHeight: "100vh", fontFamily: "Inter, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap');
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.35s ease-out forwards; }
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slideIn { animation: slideIn 0.3s ease-out forwards; }
      `}</style>

      {/* Toast stack */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div key={t.id} className="animate-slideIn bg-white rounded-lg shadow-lg border px-4 py-3 text-sm font-medium flex items-center gap-2" style={{ color: c.sage, borderColor: c.sageLine }}>
            <Check size={14} strokeWidth={3} style={{ color: c.sage }} />
            {t.msg}
          </div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto px-5 py-10 md:py-14">
        <Eyebrow>Concept preview · illustrative, not built on any current system</Eyebrow>
        <h1 style={{ fontFamily: "Fraunces, serif", color: c.ink }} className="text-2xl md:text-3xl font-medium mb-2 leading-snug">
          One patient's journey, two sides of the same screen
        </h1>
        <p className="text-sm mb-6" style={{ color: c.inkSoft, maxWidth: "38rem" }}>
          Toggle between what the clinic sees internally, and what a brand-new
          patient experiences on their own phone, from first tap to a completed intake form.
        </p>

        {/* Mode toggle with measured sliding pill */}
        <div ref={containerRef} className="relative inline-flex mb-8 rounded-full p-1.5" style={{ background: c.surfaceSoft, border: `1px solid ${c.line}` }}>
          <div
            className="absolute top-1.5 bottom-1.5 rounded-full transition-all duration-300 ease-in-out"
            style={{
              background: c.sage,
              width: pillStyle.width,
              left: pillStyle.left,
            }}
          />
          <button
            ref={clinicRef}
            onClick={() => setMode("clinic")}
            className="relative z-10 text-sm font-semibold px-5 py-2.5 rounded-full whitespace-nowrap"
            style={{ color: mode === "clinic" ? c.surface : c.inkSoft }}
          >
            Clinic view
          </button>
          <button
            ref={patientRef}
            onClick={() => setMode("patient")}
            className="relative z-10 text-sm font-semibold px-5 py-2.5 rounded-full whitespace-nowrap"
            style={{ color: mode === "patient" ? c.surface : c.inkSoft }}
          >
            Patient view (Arjun, new patient)
          </button>
        </div>

        <Stepper stages={stages} active={active} setActive={setActive} />

        <div className="rounded-3xl p-5 md:p-7 shadow-sm" style={{ background: c.surface, border: `1px solid ${c.line}` }}>
          <div key={`${mode}-${active}`} className="animate-fadeInUp">
            <Screen addToast={addToast} />
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
          <button onClick={() => setActive((a) => Math.max(0, a - 1))} disabled={active === 0}
            className="text-sm font-medium px-4 py-2 rounded-full disabled:opacity-30"
            style={{ color: c.inkSoft, border: `1px solid ${c.line}` }}>
            Back
          </button>
          <span className="text-xs" style={{ color: c.inkFaint }}>{active + 1} of {stages.length}</span>
          <button onClick={() => setActive((a) => Math.min(stages.length - 1, a + 1))} disabled={active === stages.length - 1}
            className="text-sm font-semibold px-4 py-2 rounded-full disabled:opacity-30 flex items-center gap-1.5"
            style={{ background: c.sage, color: c.surface }}>
            Next <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
