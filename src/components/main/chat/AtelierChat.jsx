"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, Send, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

export default function AtelierChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      content: "Welcome to the Ferrum archive. I can guide your selection across silhouettes, fabrics, and structural tailoring. What are you looking for today?"
    }
  ]);
  
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { id: Date.now().toString(), role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate backend response delay for the UI workflow
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Understood. I've pulled matching profiles from Edition 01 optimized for that framework.",
          products: [
            { id: "p1", name: "Column Overcoat", price: 1250, image: "/images/pdp/column-overcoat-full.jpg", slug: "column-overcoat" }
          ]
        }
      ]);
    }, 800);
  };

  return (
    <>
      {/* Fixed Floating Anchor Trigger */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 h-12 w-12 bg-zinc-100 text-zinc-950 rounded-none flex items-center justify-center shadow-2xl hover:bg-white transition-colors cursor-pointer"
        >
          <MessageSquare className="h-5 w-5" />
        </button>
      )}

      {/* Slide-Out Presentation Layer Panel */}
      <div 
        className={`fixed inset-y-0 right-0 z-50 w-full sm:w-[400px] bg-zinc-950 border-l border-zinc-900/80 shadow-2xl transform transition-transform duration-500 ease-out flex flex-col justify-between ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header Block Frame - Explicit ring-0 inline override */}
        <Card className="rounded-none border-0 ring-0 bg-transparent shadow-none flex flex-col h-full">
          <CardHeader className="p-6 border-b border-zinc-900 flex flex-row items-center justify-between space-y-0">
            <div className="space-y-1 text-left">
              <CardTitle className="text-xs font-serif font-normal tracking-[0.2em] uppercase text-zinc-200">
                Atelier Guide
              </CardTitle>
              <p className="text-[9px] uppercase tracking-widest text-zinc-500">AI Stylist Connection</p>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-zinc-500 hover:text-zinc-200 transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </CardHeader>

          {/* Chat Feed Scroll Workspace Area */}
          <CardContent 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-none custom-scrollbar"
          >
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex flex-col space-y-2 text-left max-w-[85%] ${
                  msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
                }`}
              >
                {/* Text Bubble Structure */}
                <div 
                  className={`px-4 py-3 text-xs tracking-wide leading-relaxed font-sans ${
                    msg.role === "user" 
                      ? "bg-zinc-900 text-zinc-200 rounded-none border border-zinc-800" 
                      : "bg-transparent text-zinc-300 p-0"
                  }`}
                >
                  {msg.content}
                </div>

                {/* Inline Recommended Product Cards (If model delivers products array) */}
                {msg.products && (
                  <div className="w-full pt-2 grid grid-cols-1 gap-2">
                    {msg.products.map((prod) => (
                      <div 
                        key={prod.id} 
                        className="flex gap-3 bg-zinc-900 p-2.5 border border-zinc-800/60 items-center"
                      >
                        <div className="relative h-14 w-11 shrink-0 bg-zinc-800">
                          <img src={prod.image} alt={prod.name} className="object-cover h-full w-full" />
                        </div>
                        <div className="flex-1 text-left space-y-0.5">
                          <h4 className="text-[11px] font-serif text-zinc-200 tracking-wide uppercase">{prod.name}</h4>
                          <p className="text-[10px] text-zinc-400 font-sans">${prod.price}</p>
                        </div>
                        <a 
                          href={`/collections/product/${prod.slug}`}
                          className="text-[9px] uppercase tracking-widest text-zinc-300 hover:text-zinc-100 border-b border-zinc-600 pb-0.5 transition-colors shrink-0"
                        >
                          View
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </CardContent>

          {/* Input Control Matrix Terminal Area */}
          <CardFooter className="p-4 border-t border-zinc-900 bg-zinc-950/40">
            <form onSubmit={handleSendMessage} className="flex w-full items-center gap-2 relative">
              <Input
                type="text"
                placeholder="ASK ABOUT FABRICS, SILHOUETTES..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="rounded-none bg-zinc-900/50 border-zinc-900 text-xs text-zinc-200 placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-zinc-800 focus-visible:border-zinc-800 px-4 py-5 h-auto uppercase tracking-wider w-full pr-12"
              />
              <button 
                type="submit" 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-200 transition-colors cursor-pointer"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}