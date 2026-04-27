export default function ValidationErrors({ errors }: { errors: string[] }) {
  if (!errors.length) return null;
  return <div className="validation-errors">{errors.map((e,i)=><div key={i}>• {e}</div>)}</div>;
}
