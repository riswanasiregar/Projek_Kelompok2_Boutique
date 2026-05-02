import ErrorPage from '../../components/ErrorPage';

export default function Error401() {
  return (
    <ErrorPage
      code={401}
      title="Unauthorized"
      description="Akses ditolak. Anda perlu login untuk mengakses halaman ini."
      image="/img/error401.png"
      accentColor="#c9a96e"
    />
  );
}
