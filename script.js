// ====== QUICK SETUP (edit these) ======
const MINISTRY_EMAIL = "mailto:hopeandharvest@example.com"; // TODO: replace
const MINISTRY_PHONE = "tel:+10000000000"; // TODO: replace (or WhatsApp link)

// Put your real donation links here:
const DONATE_ONE_TIME_LINK = "https://example.com/donate-once";   // TODO: replace
const DONATE_MONTHLY_LINK = "https://example.com/donate-monthly"; // TODO: replace

// ====== DONATION AMOUNT UI ======
const chips = [...document.querySelectorAll(".chip")];
const customAmount = document.getElementById("customAmount");
const donateLink = document.getElementById("donateLink");
const monthlyLink = document.getElementById("monthlyLink");
const designation = document.getElementById("designation");

function setPressed(el){
  chips.forEach(c => c.setAttribute("aria-pressed","false"));
  if(el) el.setAttribute("aria-pressed","true");
}

chips.forEach(chip => {
  chip.setAttribute("aria-pressed","false");
  chip.addEventListener("click", () => {
    setPressed(chip);
    customAmount.value = chip.dataset.amt;
    updateDonateLinks();
  });
});

customAmount.addEventListener("input", () => {
  setPressed(null);
  updateDonateLinks();
});

designation.addEventListener("change", updateDonateLinks);

function updateDonateLinks(){
  const amt = (customAmount.value || "").trim();
  const des = designation.value;

  donateLink.href = DONATE_ONE_TIME_LINK;
  monthlyLink.href = DONATE_MONTHLY_LINK;

  const hint = document.getElementById("donateHint");
  if(amt){
    hint.textContent = `Selected: $${amt} • Designation: ${des}. (Set real links in script.js)`;
  } else {
    hint.textContent = "✅ Replace the donation links in script.js (Stripe / Donorbox / Givebutter).";
  }
}
updateDonateLinks();

// ====== CONTACT INFO ======
const emailEl = document.getElementById("ministryEmail");
emailEl.href = MINISTRY_EMAIL;
emailEl.textContent = MINISTRY_EMAIL.replace("mailto:","");

const phoneEl = document.getElementById("ministryPhone");
phoneEl.href = MINISTRY_PHONE;
phoneEl.textContent = MINISTRY_PHONE.replace("tel:","");

// ====== CONTACT FORM (mailto) ======
const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const topic = document.getElementById("topic").value;
  const city = document.getElementById("city").value.trim();
  const message = document.getElementById("message").value.trim();

  if(!name || !email || !message){
    statusEl.textContent = "Please fill in required fields.";
    return;
  }

  const subject = encodeURIComponent(`Hope & Harvest Ministry — ${topic}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nCity/Region: ${city}\nTopic: ${topic}\n\nMessage:\n${message}\n`
  );

  const to = (MINISTRY_EMAIL || "mailto:").replace("mailto:","");
  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  statusEl.textContent = "Opening your email app…";
  form.reset();
});

// ====== YEAR ======
document.getElementById("year").textContent = new Date().getFullYear();

// ====== LANGUAGE TOGGLE (basic demo) ======
const langBtn = document.getElementById("langBtn");
let lang = "en";

const dict = {
  en: {
    ministry: "Ministry",
    nav_mission: "Mission",
    nav_programs: "Programs",
    nav_getinvolved: "Get Involved",
    nav_donate: "Donate",
    nav_contact: "Contact",

    donate_now: "Donate Now",
    cta_give: "Give Today",
    cta_getinvolved: "Get Involved",
    cta_learn: "Learn More",

    hero_title: "Hope in Christ. Help in Action—Worldwide.",
    hero_sub: "Hope and Harvest Ministry serves as the hands and feet of Jesus Christ—proclaiming the Gospel, making disciples, and providing humanitarian aid by training, sending, and supporting missionaries and local outreach.",
    scripture_line: "Grounded in James 1:27 • James 2:17 • Matthew 9:37 • Matthew 28:19–20 • Galatians 2:10",

    quick_title: "What we do",
    quick_sub: "We serve with compassion, and we share the Gospel with love and respect.",
    see_programs: "See Programs",
    request_help: "Contact Us",
    trust_note: "Tip: add real photos + monthly updates to build trust for donors.",

    mission_title: "Our Mission",
    mission_sub: "Inspired by the Word of God, we proclaim the Gospel and demonstrate living faith through compassionate action—bridging the gap between churches and mission fields.",
    mission_card1_title: "Proclaim the Gospel",
    mission_card1_body: "We make disciples in obedience to the Great Commission with humility, love, and truth.",
    mission_card2_title: "Serve the Vulnerable",
    mission_card2_body: "We provide compassionate help—feeding, temporary basic needs, and practical care where it’s needed most.",
    mission_card3_title: "Train, Send, Support",
    mission_card3_body: "We train and support missionaries through logistical, financial, and strategic support—so the Gospel can go further.",

    programs_title: "Programs",
    programs_sub: "We bridge the gap between churches and mission fields through training, sending, and support—logistical, financial, and strategic.",

    prog1_title: "Homeless Outreach",
    prog1_body: "Feeding, providing temporary basic needs, and offering compassionate support with dignity and prayer.",
    prog2_title: "Missionary Training & Sending",
    prog2_body: "Preparing and sending missionaries with practical training, spiritual formation, and ongoing care.",
    prog3_title: "Missionary Support",
    prog3_body: "Supporting missionaries through salaries, housing needs, travel, supplies, and field logistics.",
    prog4_title: "Church Planting & Discipleship",
    prog4_body: "Establishing churches, strengthening leaders, and making disciples in obedience to the Great Commission.",
    prog5_title: "Education & Medical Care",
    prog5_body: "Supporting education initiatives and basic medical care efforts in partnership with local communities.",
    prog6_title: "Disaster Relief & Poverty Assistance",
    prog6_body: "Responding to urgent needs with relief, resources, and long-term support for communities in crisis.",

    serve_title: "Get Involved",
    serve_sub: "There are many ways to help: give, volunteer, partner, and pray.",
    serve1_title: "Become a Monthly Partner",
    serve1_body: "Recurring giving strengthens long-term missions, outreach, and relief work.",
    monthly_give: "Monthly Giving",
    serve2_title: "Volunteer",
    serve2_body: "Help with outreach, logistics, administration, media, and mission support.",
    volunteer_signup: "Volunteer Signup",
    serve3_title: "Partner with Us",
    serve3_body: "Churches and sponsors can help us train, send, and support missionaries worldwide.",
    partner_contact: "Partner Contact",

    donate_title: "Donate",
    donate_sub: "Your gift fuels outreach and missions—training and sending workers, supporting missionaries, and meeting urgent needs worldwide.",
    donate_panel_title: "Choose an amount",
    donate_panel_sub: "Select an amount, then continue to your secure giving page.",
    custom_amount: "Custom amount (USD)",
    designation: "Designation",
    des_general: "Where Needed Most",
    des_missions: "Missionary Training & Sending",
    des_support: "Missionary Support (Salaries & Logistics)",
    des_homeless: "Homeless Outreach",
    des_relief: "Disaster Relief",
    continue_to_donate: "Continue to Donate",
    monthly_link: "Monthly Giving Link",
    donate_impact_title: "What your gift can do",
    donate_impact_body: "Donations help fund missionary training, salaries, logistics, outreach supplies, church planting support, education/medical efforts, and disaster relief.",
    donate_trust_body: "Trust tip: post monthly updates (photos + summary) in “Stories & Updates” to build credibility.",
    tax_note: "Note: “Tax-deductible” depends on your registration status in the donor’s country. Don’t claim it unless confirmed.",

    stories_title: "Stories & Updates",
    stories_sub: "Share testimonies, outreach updates, and prayer requests here (this builds trust and community).",
    story1_title: "Update example",
    story1_bold: "Add your real update here:",
    story1_text: "“This month we trained and supported missionaries and served people in need through outreach.”",
    story_hint: "Replace with real photos and numbers as you serve.",
    story2_title: "Testimony example",
    story2_bold: "Add a testimony:",
    story2_text: "“God opened a door to strengthen a community through discipleship and practical help.”",
    story_hint2: "Keep names private unless you have permission.",

    contact_title: "Contact",
    contact_sub: "Want to volunteer, partner, donate, or request help? Send a message below.",
    f_name: "Name",
    f_email: "Email",
    f_topic: "Topic",
    f_city: "City/Region",
    f_message: "Message",
    send_message: "Send Message",
    form_note: "This demo form opens your email app. For a fully functional site, we can connect it to a real inbox and database.",
    t_volunteer: "Volunteer",
    t_partner: "Partnership",
    t_donation: "Donation Question",
    t_missions: "Missions / Sending",
    t_help: "Request Help",
    t_other: "Other",
    contact_info_title: "Ministry Info",
    contact_info_body: "Serving through local outreach and mission fields worldwide—partnering with churches to bring help and the Gospel.",
    contact_email: "Email",
    contact_phone: "Phone/WhatsApp",
    contact_facebook: "Facebook",
    contact_tip: "Replace “Add your email/number” with your real contact details.",

    footer_mission: "Serving as the hands and feet of Jesus Christ—proclaiming the Gospel and caring for the vulnerable worldwide.",
    footer_legal: "Privacy & Terms: add pages if you collect payments or store personal information."
  },

  // Demo Amharic (short). You can expand later.
  am: {
    ministry: "አገልግሎት",
    nav_mission: "ተልእኮ",
    nav_programs: "ፕሮግራሞች",
    nav_getinvolved: "ተሳተፉ",
    nav_donate: "ለመርዳት",
    nav_contact: "አግኙን",
    donate_now: "አሁን ይርዱ",
    cta_give: "ዛሬ ይርዱ",
    cta_getinvolved: "ተሳተፉ",
    cta_learn: "ተጨማሪ ይማሩ",
    hero_title: "በክርስቶስ ተስፋ፣ በተግባር እርዳታ—በዓለም አቀፍ",
    hero_sub: "ወንጌልን በመስበክ፣ ደቀመዝሙርነትን በማበረታታት፣ ሚስዮናውያንን በማስተማር እና በመደገፍ የሰው ልጆችን እንረዳለን።"
  }
};

function applyI18n(){
  const items = document.querySelectorAll("[data-i18n]");
  items.forEach(el => {
    const key = el.getAttribute("data-i18n");
    const val = (dict[lang] && dict[lang][key]) || (dict.en && dict.en[key]);
    if(typeof val === "string" && val.length){
      el.textContent = val;
    }
  });
  langBtn.textContent = (lang === "en") ? "EN / አማ" : "አማ / EN";
}

langBtn.addEventListener("click", () => {
  lang = (lang === "en") ? "am" : "en";
  applyI18n();
});

applyI18n();
