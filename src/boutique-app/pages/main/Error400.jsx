import ErrorPage from '../../components/ErrorPage';

export default function Error400() {
  return (
    <ErrorPage
      code={400}
      title="Bad Request"
      description="Permintaan tidak valid. Periksa kembali data yang Anda kirimkan."
      image="/img/error400.png"
      bgColor="#e0f2fe"
      codeColor="#f43f5e"
      btnColor="#f43f5e"
    />
  );
}
