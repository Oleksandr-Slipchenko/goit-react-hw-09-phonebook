import Loader from 'react-loader-spinner';
import s from './Loader.module.css';

export default function Loading() {
  return (
    <div className={s.loading}>
      <Loader
        className="status"
        type="ThreeDots"
        color="#00BFFF"
        height={80}
        width={80}
      />
    </div>
  );
}
