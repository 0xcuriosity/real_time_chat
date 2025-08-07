"use client";
import React from "react";
import {
  MessageCircle,
  Users,
  Zap,
  Shield,
  ArrowRight,
  Github,
  Twitter,
} from "lucide-react";
import { useRouter } from "next/navigation";
interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function ChatLandingPage(): React.JSX.Element {
  const router = useRouter();
  const features: Feature[] = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Real-time messaging with zero latency",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Private",
      description: "End-to-end encryption for all conversations",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Collaboration",
      description: "Built for teams and communities",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden relative">
      {/* Static background gradient */}
      <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-transparent" />

      {/* Header */}
      <header className="relative z-10 px-6 py-8">
        <nav className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold">ChatFlow</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-300 hover:text-white transition-colors duration-300">
              About
            </button>
            <button className="text-gray-300 hover:text-white transition-colors duration-300">
              Features
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center py-20">
            <div className="animate-fade-in-up">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent leading-tight">
                Connect in
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Real Time
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Experience the future of communication with our lightning-fast,
                secure chat platform designed for modern teams.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
                <button
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 flex items-center space-x-2"
                  onClick={() => {
                    router.push("/signup");
                  }}
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </button>

                <button
                  className="group px-8 py-4 border border-gray-600 rounded-full font-semibold text-lg transition-all duration-300 hover:border-blue-400 hover:bg-blue-400/10 hover:scale-105"
                  onClick={() => {
                    router.push("/signin");
                  }}
                >
                  <span>Sign In</span>
                </button>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-20 animate-fade-in-up animation-delay-300">
              {features.map((feature: Feature, index: number) => (
                <div
                  key={index}
                  className="group p-6 rounded-2xl bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-all duration-500 hover:scale-105 hover:bg-gradient-to-b hover:from-gray-800/70 hover:to-gray-900/70"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Demo Preview */}
            <div className="animate-fade-in-up animation-delay-500">
              <div className="relative max-w-4xl mx-auto">
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 shadow-2xl">
                  <div className="flex items-center space-x-2 mb-6">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex-shrink-0"></div>
                      <div className="bg-gray-700 rounded-2xl rounded-tl-sm px-4 py-2">
                        <p className="text-sm">
                          Hey! How's the new feature coming along? 🚀
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 justify-end">
                      <div className="bg-blue-600 rounded-2xl rounded-tr-sm px-4 py-2">
                        <p className="text-sm">
                          Almost done! Just finishing up the real-time sync ✨
                        </p>
                      </div>
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex-shrink-0"></div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex-shrink-0"></div>
                      <div className="bg-gray-700 rounded-2xl rounded-tl-sm px-4 py-2">
                        <p className="text-sm">
                          Awesome! Can't wait to test it out 🎉
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center">
              <MessageCircle className="w-4 h-4" />
            </div>
            <span className="text-gray-400">
              © 2025 ChatFlow. Built for the future.
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-white transition-colors duration-300">
              <Github className="w-5 h-5" />
            </button>
            <button className="text-gray-400 hover:text-white transition-colors duration-300">
              <Twitter className="w-5 h-5" />
            </button>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
          opacity: 0;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
