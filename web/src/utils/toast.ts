import { toast } from '@/hooks/use-toast';

const showErrorToast = (message: string): void => {
  toast({
    title: 'Error!',
    description: message,
    duration: 3000,
    variant: 'destructive',
  });
};

export default showErrorToast;
