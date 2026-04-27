export default function DisabledOverlay({ show, text }: { show: boolean; text: string }) { return show ? <div className="disabled-overlay">{text}</div> : null; }
