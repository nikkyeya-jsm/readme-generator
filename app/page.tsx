import { InputForm } from '@/components/Form';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-24'>
      <h1 className='mb-10 text-4xl font-bold'>README.md Generator</h1>
      <InputForm />
    </main>
  );
}
