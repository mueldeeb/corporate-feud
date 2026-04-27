export default function WaitingOverlay({ show }: { show: boolean }) { return show ? <div className="waiting-overlay">Checking answer...</div> : null; }
