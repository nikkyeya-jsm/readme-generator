'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { sendToN8n } from '@/lib/server.actions';

const FormSchema = z.object({
  repositoryURL: z.string().min(2, {
    message:
      'Repository URL must be a valid github URL and must be at least 2 characters.',
  }),
});

export function InputForm() {
  const [result, setResult] = useState(null);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      repositoryURL: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const result = await sendToN8n(data);

    console.log('Form data:', data);
    console.log('Result from n8n:', result);
    setResult(result);

    toast('You submitted the following values', {
      description: (
        <pre className='mt-2 w-[320px] rounded-md bg-neutral-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-2/3 max-w-[700px] space-y-6'
      >
        <FormField
          control={form.control}
          name='repositoryURL'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter Your Github Repository URL</FormLabel>
              <FormControl>
                <Input
                  placeholder='Example: https://github.com/adrianhajdin/acquisitions'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full bg-yellow-400'>
          Submit
        </Button>
      </form>

      {result && (
        <pre className='mt-4 bg-gray-900 text-white p-2 rounded'>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </Form>
  );
}
