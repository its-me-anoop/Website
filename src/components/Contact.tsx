"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";

export default function Contact() {
    return (
        <footer id="contact" className="bg-black pt-24 pb-12 border-t border-white/10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
                    <div>
                        <div className="relative h-16 w-64 mb-8">
                            <Image
                                src="/logo-tagline.png"
                                alt="Flutterly Ltd. - Build Beautiful Apps"
                                fill
                                className="object-contain object-left"
                            />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Let's Build Something Amazing</h2>
                        <p className="text-gray-400 mb-8 max-w-md">
                            Ready to start your next project? Get in touch with us today for a free consultation.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4 text-gray-300">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                    <Mail className="w-5 h-5 text-blue-500" />
                                </div>
                                <span>anoop@flutterly.co.uk</span>
                            </div>
                            <div className="flex items-center gap-4 text-gray-300">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                    <Phone className="w-5 h-5 text-cyan-500" />
                                </div>
                                <span>+44 7780 580534</span>
                            </div>
                            <div className="flex items-center gap-4 text-gray-300">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                    <MapPin className="w-5 h-5 text-purple-500" />
                                </div>
                                <span>Flat 21, 3 Erleigh Road, Reading RG1 5LR, United Kingdom</span>
                            </div>
                        </div>
                    </div>

                    <form className="glass p-8 rounded-2xl space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">First Name</label>
                                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors" placeholder="John" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Last Name</label>
                                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors" placeholder="Doe" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Email</label>
                            <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors" placeholder="john@example.com" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Message</label>
                            <textarea className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors h-32 resize-none" placeholder="Tell us about your project..."></textarea>
                        </div>
                        <button className="w-full py-4 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 font-semibold hover:opacity-90 transition-opacity">
                            Send Message
                        </button>
                    </form>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">© 2025 Flutterly Ltd. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="text-gray-500 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
                        <a href="#" className="text-gray-500 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
                        <a href="#" className="text-gray-500 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
