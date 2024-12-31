import { Zap, Image, Download, Link2, FileDown, Layers, Smartphone, Cloud } from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast",
      description: "Get results in seconds with our optimized AI processing",
    },
    {
      icon: <Image className="h-6 w-6" />,
      title: "High Quality Results",
      description: "Precise edge detection for professional-looking images",
    },
    {
      icon: <FileDown className="h-6 w-6" />,
      title: "Bulk Processing",
      description: "Process multiple images at once to save time",
    },
    {
      icon: <Link2 className="h-6 w-6" />,
      title: "URL Support",
      description: "Remove backgrounds from online images directly",
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: "Free Downloads",
      description: "Download processed images in high quality PNG format",
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: "Background Options",
      description: "Choose transparent, solid color, or custom backgrounds",
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Mobile Friendly",
      description: "Works perfectly on all devices and screen sizes",
    },
    {
      icon: <Cloud className="h-6 w-6" />,
      title: "No Installation",
      description: "Use directly in your browser, no software needed",
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Why Choose Our Background Remover?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Professional-grade features, completely free to use
          </p>
        </div>
        
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {features.map((feature) => (
            <div 
              key={feature.title} 
              className="relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md"
            >
              <div className="absolute -top-4 left-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {feature.icon}
              </div>
              <div className="pt-8">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};