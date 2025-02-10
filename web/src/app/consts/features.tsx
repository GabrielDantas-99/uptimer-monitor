import { Binoculars, CloudAlert, Workflow } from "lucide-react";

export const FEATURES: FeaturesType[] = [
  {
    icon: <Binoculars />,
    title: 'Real-time Monitoring',
    description:
      'Monitor service uptime in real-time and get instant notifications for downtime.',
  },
  {
    icon: <Workflow />,
    title: 'Easy Integration',
    description: 'Integrate seamlessly with your existing tools and workflows.',
  },
  {
    icon: <CloudAlert />,
    title: 'Alerting',
    description:
      'Get instant notification of potential issues before they impact your users.',
  },
];

type FeaturesType = {
  icon: React.ReactNode;
  title: string;
  description: string;
};
