import monogramaIR from '../assets/01_Capa__monograma.png';

export default function MonogramaIR({ className = '' }) {
  return (
    <img
      src={monogramaIR}
      alt="Isabella e Rafael"
      className={`object-contain mix-blend-darken ${className}`}
    />
  );
}