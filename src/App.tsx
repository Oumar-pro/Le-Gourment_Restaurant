/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  ChevronRight, 
  ChevronLeft,
  Quote,
  Utensils, 
  CheckCircle2, 
  Instagram, 
  Facebook,
  Menu as MenuIcon,
  X,
  Leaf,
  Coins,
  ShieldCheck,
  Plus,
  Minus,
  ShoppingBag,
  Truck,
  ArrowUpDown,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const TESTIMONIALS = [
  {
    name: "Ibrahim Moussa",
    role: "Client fidèle",
    quote: "Le meilleur poulet braisé de Niamey ! Le service est rapide et l'ambiance est vraiment chaleureuse. Je recommande vivement.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80"
  },
  {
    name: "Fatima Abdou",
    role: "Gastronome",
    quote: "Le Massa est incroyable, exactement comme celui de mon enfance. Un vrai régal pour les amateurs de cuisine authentique.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80"
  },
  {
    name: "Oumarou Sani",
    role: "Entrepreneur",
    quote: "Parfait pour mes déjeuners d'affaires. Le cadre est calme et la nourriture est toujours d'une qualité exceptionnelle.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100&q=80"
  }
];

const MENU_DATA = {
  grillades: [
    {
      name: "Poulet Braisé",
      price: "3,500",
      desc: "Poulet mariné aux épices locales, servi avec aloko ou frites.",
      image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Mouton Grillé (Dibi)",
      price: "4,500",
      desc: "Viande de mouton tendre grillée au feu de bois.",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Poisson Braisé",
      price: "5,000",
      desc: "Capitaine frais du fleuve Niger, braisé avec soin.",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80"
    },
  ],
  plats_locaux: [
    {
      name: "Riz Gras",
      price: "2,000",
      desc: "Riz cuisiné à la tomate avec viande et légumes frais.",
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Massa",
      price: "1,500",
      desc: "Galettes de riz fermenté, servies avec une sauce onctueuse.",
      image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Tô et Sauce Gombo",
      price: "2,500",
      desc: "Boule de mil accompagnée d'une sauce gombo traditionnelle.",
      image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80"
    },
  ],
  boissons: [
    {
      name: "Bissap Frais",
      price: "500",
      desc: "Infusion d'hibiscus rouge, rafraîchissante et naturelle.",
      image: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Jus de Gingembre",
      price: "500",
      desc: "Jus de gingembre frais, piquant et énergisant.",
      image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Eau Minérale (1.5L)",
      price: "700",
      desc: "Eau de source locale purifiée.",
      image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=800&q=80"
    },
  ]
};

export default function App() {
  const [activeCategory, setActiveCategory] = useState<'grillades' | 'plats_locaux' | 'boissons'>('grillades');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [orderType, setOrderType] = useState<'delivery' | 'takeaway'>('takeaway');
  const [address, setAddress] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'alpha'>('default');
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  const galleryImages = [
    { src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80", aspect: "aspect-[4/5]" },
    { src: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80", aspect: "aspect-[4/3]" },
    { src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80", aspect: "aspect-[2/3]" },
    { src: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80", aspect: "aspect-square" },
    { src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80", aspect: "aspect-[3/4]" },
    { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80", aspect: "aspect-[5/4]" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappNumber = "22790000000"; // Placeholder for Niamey
  const phoneNumber = "+22790000000";

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleOrder = () => {
    const typeText = orderType === 'delivery' ? `Livraison (Adresse: ${address})` : 'À emporter';
    const message = `Bonjour, je souhaite commander : ${quantity}x ${selectedItem.name} (${selectedItem.price} F/unité). %0A%0AMode : ${typeText}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    setSelectedItem(null);
    setQuantity(1);
  };

  const clearCart = () => {
    setQuantity(1);
    setSelectedItem(null);
  };

  const getSortedMenu = (items: any[]) => {
    const sorted = [...items];
    if (sortBy === 'price-asc') {
      return sorted.sort((a, b) => parseFloat(a.price.replace(',', '')) - parseFloat(b.price.replace(',', '')));
    }
    if (sortBy === 'price-desc') {
      return sorted.sort((a, b) => parseFloat(b.price.replace(',', '')) - parseFloat(a.price.replace(',', '')));
    }
    if (sortBy === 'alpha') {
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
    return sorted;
  };

  return (
    <div className="min-h-screen selection:bg-primary/30">
      {/* Order Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-white w-full max-w-md rounded-t-[32px] sm:rounded-[32px] p-6 shadow-2xl overflow-hidden"
            >
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 sm:hidden" />
              
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold font-serif">{selectedItem.name}</h3>
                  <p className="text-primary font-bold">{selectedItem.price} F / unité</p>
                </div>
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Quantity Selector */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Quantité</label>
                  <div className="flex items-center justify-between bg-gray-50 p-2 rounded-2xl">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary active:scale-90 transition-transform"
                    >
                      <Minus size={20} />
                    </button>
                    <span className="text-xl font-bold">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary active:scale-90 transition-transform"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>

                {/* Order Type */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Mode de récupération</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => setOrderType('takeaway')}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${orderType === 'takeaway' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 text-gray-400'}`}
                    >
                      <ShoppingBag size={24} />
                      <span className="text-xs font-bold">À emporter</span>
                    </button>
                    <button 
                      onClick={() => setOrderType('delivery')}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${orderType === 'delivery' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 text-gray-400'}`}
                    >
                      <Truck size={24} />
                      <span className="text-xs font-bold">Livraison</span>
                    </button>
                  </div>
                </div>

                {/* Address Input */}
                {orderType === 'delivery' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Adresse de livraison</label>
                    <textarea 
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Ex: Quartier Plateau, Rue 12, Porte 5..."
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[80px]"
                    />
                  </motion.div>
                )}

                <div className="flex flex-col gap-3">
                  <button 
                    onClick={handleOrder}
                    disabled={orderType === 'delivery' && !address.trim()}
                    className="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-3 active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100"
                  >
                    <MessageCircle size={20} />
                    Confirmer sur WhatsApp
                  </button>

                  <button 
                    onClick={clearCart}
                    className="w-full py-3 text-gray-400 font-bold text-xs flex items-center justify-center gap-2 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={14} />
                    Vider le panier
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white">
              <Utensils size={20} />
            </div>
            <span className="text-xl font-serif font-bold tracking-tight">Le Gourmet Niamey</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {['Menu', 'Pourquoi nous', 'Galerie', 'Contact'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {item}
              </button>
            ))}
            <a 
              href={`tel:${phoneNumber}`}
              className="bg-primary text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-primary/90 transition-all shadow-md active:scale-95"
            >
              Appeler maintenant
            </a>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-center">
              {['Menu', 'Pourquoi nous', 'Galerie', 'Contact'].map((item) => (
                <button 
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                  className="text-2xl font-serif font-medium"
                >
                  {item}
                </button>
              ))}
              <div className="pt-6 flex flex-col gap-4">
                <a 
                  href={`https://wa.me/${whatsappNumber}`}
                  className="bg-[#25D366] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  <MessageCircle size={20} /> Commander sur WhatsApp
                </a>
                <a 
                  href={`tel:${phoneNumber}`}
                  className="bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  <Phone size={20} /> Appeler maintenant
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
            alt="Plat local Niamey" 
            className="w-full h-full object-cover"
            loading="eager"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full text-white pt-20 pb-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-3 py-1 bg-primary rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">
              Le meilleur de Niamey
            </span>
            <h1 className="text-4xl md:text-7xl font-bold mb-4 leading-tight">
              Savourez les meilleurs plats à Niamey
            </h1>
            <p className="text-base md:text-xl mb-8 text-gray-100 font-normal leading-relaxed">
              Cuisine authentique, ingrédients frais. Commandez sur WhatsApp ou appelez-nous.
            </p>
            
            <div className="flex flex-col gap-3">
              <a 
                href={`https://wa.me/${whatsappNumber}`}
                className="bg-[#25D366] text-white w-full sm:w-auto px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-3 shadow-lg active:scale-95"
              >
                <MessageCircle size={20} />
                Commander sur WhatsApp
              </a>
              <a 
                href={`tel:${phoneNumber}`}
                className="bg-white text-black w-full sm:w-auto px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-3 shadow-lg active:scale-95"
              >
                <Phone size={20} />
                Appeler maintenant
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Elements Bar */}
      <div className="bg-white border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-x-6 gap-y-3 text-gray-500">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-primary" />
            <span className="text-xs font-bold">+500 clients</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-primary" />
            <span className="text-xs font-bold">Service rapide</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-primary" />
            <span className="text-xs font-bold">7j/7</span>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <section id="menu" className="py-24 bg-warm-bg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Notre Menu</h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Découvrez nos spécialités préparées avec passion pour ravir vos papilles.
            </p>
          </div>

          {/* Category Tabs & Sorting */}
          <div className="flex flex-col gap-6 mb-12">
            <div className="flex justify-start md:justify-center overflow-x-auto pb-4 gap-2 no-scrollbar">
              {[
                { id: 'grillades', label: 'Grillades' },
                { id: 'plats_locaux', label: 'Plats Locaux' },
                { id: 'boissons', label: 'Boissons' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`px-6 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                    activeCategory === cat.id 
                      ? 'bg-primary text-white shadow-md' 
                      : 'bg-white text-gray-600 border border-gray-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-center gap-3">
              <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-3 py-2 shadow-sm">
                <ArrowUpDown size={14} className="text-gray-400" />
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-xs font-bold focus:outline-none appearance-none pr-4 cursor-pointer"
                >
                  <option value="default">Trier par</option>
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix décroissant</option>
                  <option value="alpha">Nom (A-Z)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="wait">
              {getSortedMenu(MENU_DATA[activeCategory]).map((item) => (
                <motion.div
                  key={`${activeCategory}-${item.name}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white p-5 rounded-2xl shadow-sm border border-gray-50"
                >
                  <div className="aspect-video w-full mb-4 rounded-xl overflow-hidden bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold font-serif">{item.name}</h3>
                    <span className="text-primary font-bold">{item.price} F</span>
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4">
                    {item.desc}
                  </p>
                  <button 
                    onClick={() => {
                      setSelectedItem(item);
                      setQuantity(1);
                    }}
                    className="w-full py-3 rounded-xl bg-primary text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm active:scale-95"
                  >
                    Commander <ChevronRight size={14} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="pourquoi-nous" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80"
                alt="Cuisine propre" 
                className="rounded-3xl shadow-xl w-full aspect-[4/5] object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -right-4 hidden md:block w-48 h-48 bg-primary rounded-3xl p-6 text-white shadow-lg">
                <p className="text-3xl font-bold mb-1">100%</p>
                <p className="text-xs font-medium opacity-90">Frais et local.</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Pourquoi nous choisir ?</h2>
              <div className="space-y-8">
                {[
                  { title: "Ingrédients Frais", desc: "Nous utilisons uniquement des produits locaux frais pour garantir le meilleur goût.", icon: <Leaf size={24} /> },
                  { title: "Service Rapide", desc: "Votre temps est précieux. Nous nous engageons à vous servir dans les plus brefs délais.", icon: <Clock size={24} /> },
                  { title: "Prix Abordables", desc: "La qualité gastronomique accessible à tous les budgets de Niamey.", icon: <Coins size={24} /> },
                  { title: "Restaurant de Confiance", desc: "Un lieu propre et accueillant, respectant toutes les normes d'hygiène.", icon: <ShieldCheck size={24} /> }
                ].map((feature, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                      <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="temoignages" className="py-24 bg-warm-bg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Ce que disent nos clients</h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              La satisfaction de nos clients est notre plus grande récompense.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-2xl shadow-sm relative"
              >
                <Quote className="absolute top-4 right-6 text-primary/10 w-8 h-8" />
                <p className="text-gray-600 italic text-sm mb-6 relative z-10">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <img 
                    src={t.image} 
                    alt={t.name} 
                    className="w-10 h-10 rounded-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-bold text-xs">{t.name}</h4>
                    <p className="text-[10px] text-gray-400">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="galerie" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Notre Ambiance</h2>
          <p className="text-gray-500 max-w-lg mx-auto">Un voyage visuel au cœur de notre cuisine et de notre cadre chaleureux.</p>
        </div>
        
        <div className="max-w-7xl mx-auto px-4">
          <div className="columns-2 lg:columns-3 gap-4 space-y-4">
            {galleryImages.map((img, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className={`break-inside-avoid rounded-2xl overflow-hidden shadow-sm ${img.aspect}`}
              >
                <div className="relative w-full h-full bg-gray-100">
                  {!loadedImages[i] && (
                    <motion.div
                      className="absolute inset-0 bg-gray-200 z-30"
                      initial={{ opacity: 1 }}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    />
                  )}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent z-10"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  />
                  <img 
                    src={img.src} 
                    alt={`Galerie ${i + 1}`} 
                    className={`w-full h-full object-cover relative z-20 transition-opacity duration-500 ${loadedImages[i] ? 'opacity-100' : 'opacity-0'}`}
                    loading="lazy"
                    onLoad={() => setLoadedImages(prev => ({ ...prev, [i]: true }))}
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gray-50 rounded-3xl p-6 md:p-12 grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Situé à Niamey</h2>
              <p className="text-gray-600 mb-6 text-base">
                Quartier Plateau, Niamey, Niger. Ouvert 11h - 23h.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-700 text-sm">
                  <MapPin size={18} className="text-primary" />
                  <span>Près du Grand Marché</span>
                </div>
              </div>
            </div>
            <div className="h-[250px] bg-gray-200 rounded-2xl overflow-hidden relative">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 p-4 text-center">
                <MapPin size={32} className="mb-2 opacity-20" />
                <p className="text-xs font-medium">Carte de Niamey</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-warm-bg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Prêt à commander ?</h2>
            
            <div className="flex flex-col gap-4 mb-10">
              <a 
                href={`https://wa.me/${whatsappNumber}`}
                className="bg-[#25D366] text-white p-6 rounded-2xl shadow-lg flex items-center justify-center gap-4 active:scale-95"
              >
                <MessageCircle size={24} />
                <span className="font-bold">WhatsApp</span>
              </a>
              
              <a 
                href={`tel:${phoneNumber}`}
                className="bg-primary text-white p-6 rounded-2xl shadow-lg flex items-center justify-center gap-4 active:scale-95"
              >
                <Phone size={24} />
                <span className="font-bold">Appeler</span>
              </a>
            </div>

            <button 
              onClick={() => window.open('https://example.com/track-order', '_blank')}
              className="text-primary font-bold text-xs hover:underline"
            >
              Suivre ma commande
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
                  <Utensils size={16} />
                </div>
                <span className="text-lg font-serif font-bold">Le Gourmet Niamey</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Le Gourmet Niamey est votre destination privilégiée pour savourer l'authenticité de la cuisine nigérienne dans un cadre moderne et accueillant.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-6">Liens Rapides</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><button onClick={() => scrollToSection('menu')} className="hover:text-primary transition-colors">Notre Menu</button></li>
                <li><button onClick={() => scrollToSection('pourquoi-nous')} className="hover:text-primary transition-colors">Pourquoi nous</button></li>
                <li><button onClick={() => scrollToSection('temoignages')} className="hover:text-primary transition-colors">Témoignages</button></li>
                <li><button onClick={() => scrollToSection('galerie')} className="hover:text-primary transition-colors">Galerie</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-primary transition-colors">Contact</button></li>
                <li><button onClick={() => window.open('https://example.com/track-order', '_blank')} className="text-primary font-bold hover:underline">Suivre ma commande</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6">Suivez-nous</h4>
              <div className="flex gap-4">
                <a href="https://instagram.com/legourmetniamey" target="_blank" rel="noreferrer" className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                  <Instagram size={20} />
                </a>
                <a href="https://facebook.com/legourmetniamey" target="_blank" rel="noreferrer" className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                  <Facebook size={20} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-50 pt-8 text-center text-xs text-gray-400">
            <p>© {new Date().getFullYear()} Le Gourmet Niamey. Tous droits réservés. Design pour Niamey.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href={`https://wa.me/${whatsappNumber}`}
        className="fixed bottom-4 right-4 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl flex items-center justify-center active:scale-90 transition-transform"
        aria-label="WhatsApp"
      >
        <MessageCircle size={28} />
      </a>
    </div>
  );
}
