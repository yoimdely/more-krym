import React, { useEffect, useState, useCallback } from "react";
import {
  Building2, Waves, Ruler, ParkingSquare, Home, MapPin, FileSignature, Banknote,
  Bike, School, HeartHandshake, Store, ShieldCheck, CircuitBoard, FileText, ChevronUp
} from "lucide-react";
import { motion } from "framer-motion";

const WA = "https://wa.me/79124530205?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20\u041f\u043e%20\u0436\u043a%20\u00AB\u041c\u043e\u0440\u0435\u00BB%20\u0432%20\u041a\u0440\u044b\u043c\u0443%2C%20\u043f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430%2C%20\u043f\u043e\u0434\u0431\u043e\u0440%20\u043a\u0432\u0430\u0440\u0442\u0438\u0440\u00A0%2B%20\u0438\u043f\u043e\u0442\u0435\u043a\u0430";
const MEDIA = (n) => `/media/${n}.jpg`;

function useSEO(){
  useEffect(()=>{
    document.title = "ЖК «Море» — Евпатория, Крым | квартиры у моря";
    const set = (name, content, prop=false)=>{
      const key = prop ? "property" : "name";
      const sel = `meta[${key}="${name}"]`;
      let el = document.querySelector(sel);
      if(!el){ el = document.createElement("meta"); el.setAttribute(key, name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    set("description", "ЖК «Море» в Евпатории: комфорт‑класс, монолит‑кирпич, 12 корпусов 14–15 этажей, высота потолков 2,86–3,02 м. Кладовые, паркинг, школы и сады. Сроки: 3 кв. 2026 — 4 кв. 2029. ДДУ 214‑ФЗ.");
    set("og:title", "ЖК «Море» — Евпатория, Крым", true);
    set("og:description", "Квартиры у моря, предчистовая отделка, паркинг, инфраструктура. Планировки и цены.");
    set("og:type", "website", true);
  },[]);
}

const Badge = ({icon, children}) => (
  <div className="px-3 py-2 rounded-xl border bg-white flex items-center gap-2 text-sm shadow-sm"
       style={{borderColor:"#EAD6C4", color:"#2B2118"}}>
    {icon}{children}
  </div>
);

function Stat({ value, label, sub, icon }){
  return (
    <div className="p-5 rounded-2xl border h-full bg-white shadow-sm"
         style={{ borderColor: "#EAD6C4", color: "#2B2118"}}>
      <div className="text-sm mb-2 flex items-center gap-2">{icon}{label}</div>
      <div className="text-xl font-semibold">{value}</div>
      {sub && <div className="text-xs mt-1" style={{ color: "#4B3B30" }}>{sub}</div>}
    </div>
  );
}

function ScrollTop(){
  const [show, setShow] = useState(false);
  useEffect(()=>{
    const on = ()=> setShow(window.scrollY > 400);
    window.addEventListener("scroll", on); on(); return ()=> window.removeEventListener("scroll", on);
  },[]);
  return (
    <button aria-label="Наверх"
      onClick={()=>window.scrollTo({top:0, behavior:"smooth"})}
      className={`fixed bottom-5 right-5 z-40 transition-all ${show?"opacity-100":"opacity-0 pointer-events-none"}`}
      style={{background:"#C65D3A", color:"#FFF8F2", borderRadius:14, padding:12, boxShadow:"0 8px 20px rgba(198,93,58,.35)"}}>
      <ChevronUp size={20}/>
    </button>
  );
}

function WavesDecor(){
  return (
    <svg className="absolute inset-x-0 -top-10 pointer-events-none" viewBox="0 0 1440 200" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0,160 C240,80 480,80 720,140 C960,200 1200,200 1440,160 L1440,0 L0,0 Z" fill="#F6E6D9"></path>
    </svg>
  );
}

export default function App(){
  useSEO();
  const [sent,setSent] = useState(false);
  const [sending,setSending] = useState(false);

  const onSubmit = useCallback(async (e)=>{
    e.preventDefault();
    try{
      setSending(true);
      const data = new FormData(e.currentTarget);
      const res = await fetch("https://api.web3forms.com/submit",{ method:"POST", body:data });
      if(!res.ok) throw new Error("Network error");
      setSent(true); e.currentTarget.reset();
    }catch(err){ alert("Ошибка отправки. Напишите в WhatsApp, мы на связи!"); }
    finally{ setSending(false); }
  },[]);

  return (
    <div style={{ background:"#FFF8F2", color:"#1F1B16", fontFamily:"Montserrat, system-ui, sans-serif" }}>
      <header className="sticky top-0 z-30 border-b backdrop-blur"
              style={{ background:"rgba(255,248,242,.94)", borderColor:"#EAD6C4"}}>
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center gap-3">
          <a href="#" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl grid place-items-center font-semibold"
                 style={{background:"#2B2118", color:"#F6E6D9"}}>М</div>
            <div className="leading-tight">
              <div className="font-extrabold" style={{ fontFamily:"Prata, serif"}}>ЖК «Море»</div>
              <div className="text-[11px]" style={{ color:"#7A6A5F"}}><MapPin size={12} className="inline mr-1"/> Евпатория · у моря</div>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-[13px] ml-6">
            {[["О проекте","#about"],["Локация","#location"],["Планировки","#plans"],["Галерея","#gallery"],["Контакты","#buy"]].map(([t,href])=>(
              <a key={href} href={href} className="hover:text-orange-600" style={{ color:"#4B3B30"}}>{t}</a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <a href={WA} className="px-4 py-2 rounded-2xl border hover:shadow-md" style={{borderColor:"#D4A373", color:"#2B2118"}}>Написать в WhatsApp</a>
            <a href="#cta" className="px-4 py-2 rounded-2xl hover:shadow-md" style={{ background:"#C65D3A", color:"#FFF8F2"}}>Подбор квартиры</a>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <WavesDecor/>
        <div className="relative max-w-6xl mx-auto px-5 py-12 md:py-16 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{opacity:0, y:18}} animate={{opacity:1, y:0}} transition={{duration:.5}}>
            <h1 className="leading-tight" style={{fontFamily:"Prata, serif", color:"#2B2118", fontSize: "clamp(28px,5.4vw,48px)"}}>
              Новый жилой квартал у моря — <span className="whitespace-nowrap">ЖК «Море»</span> в Евпатории
            </h1>
            <p className="mt-4 text-base md:text-lg" style={{ color:"#4B3B30", maxWidth:640}}>
              Комфорт‑класс, монолит‑кирпич, 12 корпусов по 14–15 этажей. Предчистовая отделка, высота потолков 2,86–3,02 м.
              Паркинг (крытый и гостевой), кладовые, благоустроенные дворы. Сроки: 3 кв. 2026 — 4 кв. 2029. ДДУ 214‑ФЗ.
            </p>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Badge icon={<Waves size={18}/>}>Озеро Мойнакское — 5 мин. пешком</Badge>
              <Badge icon={<Building2 size={18}/>}>12 корпусов · 14–15 этажей</Badge>
              <Badge icon={<Ruler size={18}/>}>Высота потолков 2,86–3,02 м</Badge>
              <Badge icon={<ParkingSquare size={18}/>}>Паркинг: крытый 276 м/м + гостевой</Badge>
            </div>
            <div className="mt-7 flex gap-3">
              <a href="#cta" className="px-5 py-3 rounded-2xl hover:shadow-md" style={{ background:"#C65D3A", color:"#FFF8F2"}}>Получить подборку</a>
              <a href={WA} className="px-5 py-3 rounded-2xl border hover:shadow-md" style={{borderColor:"#D4A373", color:"#2B2118"}}>Связаться в WhatsApp</a>
            </div>
          </motion.div>

          <motion.div className="rounded-3xl overflow-hidden shadow-lg border" style={{borderColor:"#EAD6C4"}}
            initial={{opacity:0, scale:.98}} animate={{opacity:1, scale:1}} transition={{duration:.6}}>
            <img src={MEDIA(1)} alt="Визуализация ЖК «Море», Евпатория" className="w-full h-full object-cover" loading="eager"/>
          </motion.div>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-6xl mx-auto px-5 grid sm:grid-cols-2 md:grid-cols-4 gap-5">
          <Stat value="14–15" label="Этажность" icon={<Building2 size={18}/>}/>
          <Stat value="2,86–3,02 м" label="Потолки" icon={<Ruler size={18}/>}/>
          <Stat value="Крытый + гостевой" label="Паркинг" sub="276 м/м" icon={<ParkingSquare size={18}/>}/>
          <Stat value="214‑ФЗ, ДДУ" label="Юридически" icon={<ShieldCheck size={18}/>}/>
        </div>
      </section>

      <section id="about" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold" style={{fontFamily:"Prata, serif"}}>О проекте</h2>
            <p className="mt-4" style={{ color:"#4B3B30"}}>
              «Море» — современный жилой квартал комфорт‑класса у моря. Безбарьерная среда, благоустроенные дворы с аллеями,
              игровые и спортивные зоны, кладовые помещения и коммерция шаговой доступности. Панорамное остекление и
              удобные планировки 1–3‑комнатных квартир.
            </p>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {[
                {h:"Сроки", t:"3 кв. 2026 — 4 кв. 2029 (очередями)", icon:<FileText size={18}/>},
                {h:"Технологии", t:"Монолит‑кирпич, панорамные окна, дизайнерские входные группы", icon:<CircuitBoard size={18}/>},
                {h:"Юридически", t:"ДДУ, 214‑ФЗ. Застройщик: ГК «ДОМ».", icon:<ShieldCheck size={18}/>},
                {h:"Инфраструктура", t:"Планируются сад, школа, вейк‑парк, SPA‑центр, ТРЦ и конгресс‑центр", icon:<Store size={18}/>},
              ].map((c,i)=> (
                <div key={i} className="p-5 rounded-2xl border flex items-start gap-3 bg-white" style={{borderColor:"#EAD6C4"}}>
                  <div className="w-9 h-9 rounded-xl grid place-items-center border" style={{borderColor:"#EAD6C4", background:"#FFF8F2"}}>{c.icon}</div>
                  <div>
                    <div className="font-semibold" style={{color:"#2B2118"}}>{c.h}</div>
                    <div className="text-sm mt-1" style={{color:"#4B3B30"}}>{c.t}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <aside className="p-6 rounded-2xl border" style={{background:"#F6E6D9", borderColor:"#EAD6C4"}}>
            <div className="font-semibold flex items-center gap-2" style={{color:"#2B2118"}}><Building2 size={18}/> Ключевые факты</div>
            <ul className="mt-3 space-y-2 text-sm" style={{color:"#4B3B30"}}>
              <li><Waves size={14} className="inline mr-2"/> До набережной ~6 км</li>
              <li><ParkingSquare size={14} className="inline mr-2"/> Паркинг: крытый 276 м/м + гостевой</li>
              <li><Ruler size={14} className="inline mr-2"/> Потолки 2,86–3,02 м</li>
              <li><ShieldCheck size={14} className="inline mr-2"/> ДДУ 214‑ФЗ</li>
            </ul>
            <a href="#cta" className="mt-5 inline-block w-full text-center px-4 py-2 rounded-xl hover:shadow-md"
               style={{background:"#C65D3A", color:"#FFF8F2"}}>Запросить подборку</a>
          </aside>
        </div>
      </section>

      <section id="gallery" className="py-14 md:py-20" style={{background:"#FFF3EA"}}>
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{fontFamily:"Prata, serif"}}>
            <Building2 size={22}/> Галерея</h2>
          <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[1,2,3,4,5,6,7,8].map(i=> (
              <div key={i} className="aspect-[4/3] rounded-2xl overflow-hidden shadow border group" style={{borderColor:"#EAD6C4"}}>
                <img src={MEDIA(i)} alt={`ЖК «Море» фото ${i}`} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform" loading="lazy"/>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="location" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{fontFamily:"Prata, serif"}}>
              <MapPin size={22}/> Локация и окружение</h2>
            <p className="mt-4" style={{color:"#4B3B30"}}>
              Республика Крым, Евпатория, ул. им. 60‑летия СССР / ул. Ялтинская. В шаговой доступности — Мойнакское озеро,
              планируемые новые социальные объекты; удобный выезд на трассу «Таврида».
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
              {[
                {t:"Школы и детские сады", icon:<School size={16}/>} ,
                {t:"Медицинский центр", icon:<HeartHandshake size={16}/>},
                {t:"Магазины и услуги", icon:<Store size={16}/>},
                {t:"Транспортная доступность", icon:<Bike size={16}/>},
              ].map((i,idx)=> (
                <li key={idx} className="p-3 rounded-xl border flex items-center gap-2 bg-white" style={{borderColor:"#EAD6C4", color:"#2B2118"}}>
                  {i.icon}{i.t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden shadow border" style={{borderColor:"#EAD6C4"}}>
            <iframe title="map" src="https://yandex.ru/map-widget/v1/?ll=33.349%2C45.198&z=12" className="w-full h-[360px]" loading="lazy"/>
          </div>
        </div>
      </section>

      <section id="plans" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{fontFamily:"Prata, serif"}}>
            <Ruler size={22}/> Планировки и метражи</h2>
          <p className="mt-3" style={{color:"#4B3B30"}}>
            1‑комнатные — от ~39 м²; 2‑комнатные — от ~58 м²; 3‑комнатные — от ~86 м². Передача — в предчистовой отделке.
          </p>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {[
              { t:"1‑комнатные", d:"от ~39,3 м², эргономичные планировки", icon:<Home size={18}/>},
              { t:"2‑комнатные", d:"от ~57,9 м², кухни‑гостиные, балконы", icon:<Home size={18}/>},
              { t:"3‑комнатные", d:"от ~86,5 м², семейные форматы", icon:<Home size={18}/>},
            ].map((c,i)=> (
              <div key={i} className="p-5 rounded-2xl border flex items-start gap-3 bg-white" style={{borderColor:"#EAD6C4"}}>
                <div className="w-9 h-9 rounded-xl grid place-items-center border" style={{borderColor:"#EAD6C4", background:"#FFF8F2"}}>{c.icon}</div>
                <div>
                  <div className="font-semibold" style={{color:"#2B2118"}}>{c.t}</div>
                  <div className="text-sm mt-1" style={{color:"#4B3B30"}}>{c.d}</div>
                  <a href="#cta" className="mt-3 inline-block text-sm hover:underline" style={{color:"#C65D3A"}}>
                    Запросить PDF‑подборку планировок
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="phasing" className="py-14 md:py-20" style={{background:"#FFF3EA"}}>
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{fontFamily:"Prata, serif"}}>
            <Building2 size={22}/> Очереди строительства</h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border bg-white" style={{borderColor:"#EAD6C4"}}>
            <table className="min-w-full text-sm">
              <thead style={{background:"#F6E6D9", color:"#2B2118"}}>
                <tr><th className="text-left px-4 py-3">Очередь</th><th className="text-left px-4 py-3">Срок</th><th className="text-left px-4 py-3">Комментарий</th></tr>
              </thead>
              <tbody style={{color:"#4B3B30"}}>
                <tr className="border-t" style={{borderColor:"#EAD6C4"}}><td className="px-4 py-3">1 очередь</td><td className="px-4 py-3">3 кв. 2026</td><td className="px-4 py-3">Старт ввода</td></tr>
                <tr className="border-t" style={{borderColor:"#EAD6C4"}}><td className="px-4 py-3">2–3 очереди</td><td className="px-4 py-3">2026–2028</td><td className="px-4 py-3">Продолжение строительства</td></tr>
                <tr className="border-t" style={{borderColor:"#EAD6C4"}}><td className="px-4 py-3">Завершение</td><td className="px-4 py-3">до 4 кв. 2029</td><td className="px-4 py-3">Финал проекта</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="process" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{fontFamily:"Prata, serif"}}>
            <FileSignature size={22}/> Как проходит покупка</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border bg-white" style={{borderColor:"#EAD6C4"}}>
              <div className="font-semibold" style={{color:"#2B2118"}}>Шаги</div>
              <ol className="mt-3 text-sm list-decimal pl-5 space-y-1" style={{color:"#4B3B30"}}>
                <li>Заявка — пришлём подборку с планировками и ценами</li>
                <li>Выбор — консультация, бронирование</li>
                <li>Ипотека/оплата — ДДУ на эскроу‑счёт</li>
                <li>Сделка — подписание, регистрация, ключи</li>
              </ol>
              <div className="mt-4 text-xs" style={{color:"#7A6A5F"}}>Банки‑партнёры: Сбер, ВТБ, Дом.РФ, Альфа и др.</div>
            </div>
            <div className="p-6 rounded-2xl border bg-white" style={{borderColor:"#EAD6C4"}}>
              <div className="font-semibold flex items-center gap-2" style={{color:"#2B2118"}}><Home size={18}/> Видео‑тур по кварталу</div>
              <div className="mt-3 aspect-video rounded-xl overflow-hidden border" style={{borderColor:"#EAD6C4"}}>
                <iframe title="video" src="https://www.youtube.com/embed/hLcCQA-CH8U"
                  className="w-full h-full" loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="buy" className="py-20">
        <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{fontFamily:"Prata, serif"}}>
              <FileSignature size={22}/> Оставьте заявку на подбор</h2>
            <p style={{color:"#4B3B30"}}>Подберём планировки и условия под вашу задачу — проживание, аренда, инвестиция.</p>
            <a href={WA} className="inline-block px-5 py-3 rounded-2xl border hover:shadow-md" style={{borderColor:"#D4A373", color:"#2B2118"}}>Написать в WhatsApp</a>
          </div>
          <div id="cta" className="p-6 rounded-2xl border shadow bg-white" style={{borderColor:"#EAD6C4"}}>
            {sent ? (
              <div className="text-center">
                <div className="text-xl font-semibold" style={{color:"#2B2118"}}>Спасибо! Заявка отправлена.</div>
                <p className="mt-2" style={{color:"#4B3B30"}}>Свяжемся с вами в ближайшее время.</p>
              </div>
            ) : (
              <>
                <div className="text-xl font-semibold" style={{color:"#2B2118"}}>Получить подборку квартир</div>
                <p className="text-sm mt-1" style={{color:"#4B3B30"}}>Оставьте контакты — пришлём актуальные планировки, цены и акции.</p>
                <form onSubmit={onSubmit} className="mt-4 space-y-3">
                  <input type="hidden" name="access_key" value="af90736e-9a82-429d-9943-30b5852e908a" />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{borderColor:"#EAD6C4"}} name="name" placeholder="Ваше имя" required/>
                  <input className="w-full px-4 py-3 rounded-xl border" style={{borderColor:"#EAD6C4"}} name="phone" placeholder="Телефон" required/>
                  <input className="w-full px-4 py-3 rounded-xl border" style={{borderColor:"#EAD6C4"}} name="email" placeholder="Email (по желанию)"/>
                  <textarea className="w-full px-4 py-3 rounded-xl border" style={{borderColor:"#EAD6C4"}} name="message" placeholder="Комментарий" rows={3}/>
                  <button type="submit" disabled={sending}
                    className="w-full px-4 py-3 rounded-xl hover:shadow-md disabled:opacity-70"
                    style={{background:"#C65D3A", color:"#FFF8F2"}}>
                    {sending ? "Отправляем..." : "Отправить"}
                  </button>
                </form>
                <a href={WA} className="mt-3 block text-center px-4 py-3 rounded-xl border hover:shadow-md" style={{borderColor:"#D4A373", color:"#2B2118"}}>
                  Или написать в WhatsApp
                </a>
                <p className="mt-3 text-xs" style={{color:"#7A6A5F"}}>Нажимая кнопку, вы соглашаетесь с <a href="/privacy.html" style={{color:"#C65D3A"}}>политикой конфиденциальности</a>.</p>
              </>
            )}
          </div>
        </div>
      </section>

      <footer className="py-12 border-t" style={{borderColor:"#EAD6C4"}}>
        <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-3 gap-6 text-sm" style={{color:"#4B3B30"}}>
          <div className="md:col-span-2">
            <div className="font-semibold flex items-center gap-2" style={{color:"#2B2118"}}><Home size={16}/> ЖК «Море»</div>
            <p className="mt-2">Евпатория, ул. 60‑летия СССР / ул. Ялтинская</p>
            <p className="mt-1">Застройщик: ГК «ДОМ». Строительство по 214‑ФЗ с использованием эскроу‑счетов.</p>
          </div>
          <div className="md:text-right">
            <a href="/privacy.html" className="underline">Политика конфиденциальности</a>
            <span className="mx-2">•</span>
            <a href="/consent.html" className="underline">Согласие на обработку ПДн</a>
          </div>
        </div>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context":"https://schema.org",
        "@type":"Organization",
        "name":"ЖК «Море»",
        "url": typeof location!=="undefined" ? location.href : "https://jk-more-krim.example/",
        "address":{"@type":"PostalAddress","addressLocality":"Евпатория","addressRegion":"Республика Крым","addressCountry":"RU"}
      })}}/>
      <ScrollTop/>
    </div>
  );
}
