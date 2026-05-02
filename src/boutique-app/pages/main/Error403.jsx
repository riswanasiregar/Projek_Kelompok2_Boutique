import ErrorPage from '../../components/ErrorPage';

export default function Error403() {
  return (
    <ErrorPage
      code={403}
      title="Forbidden"
      description="Tidak diizinkan. Anda tidak memiliki akses ke halaman ini."
      image="/img/error403.png"
      bgColor="#ede9fe"
      codeColor="#f43f5e"
      btnColor="#f43f5e"
    />
  );
}
