const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

function scrollToPlanner(){ $('#planner').scrollIntoView({behavior:'smooth'}); }

// Mobile menu
const menuBtn = $('#menuBtn');
const mobileMenu = $('#mobileMenu');
menuBtn.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.textContent = open ? '×' : '☰';
});
$$('#mobileMenu a').forEach(a => a.addEventListener('click', () => {
  mobileMenu.classList.remove('open'); menuBtn.setAttribute('aria-expanded','false'); menuBtn.textContent='☰';
}));

// Destination cards open a rich destination guide; the guide can pass its destination to the planner.
const destinationGuides = {
  'Bali, Indonesia': {region:'INDONESIA', title:'Bali, Indonesia', description:'A tropical island known for emerald rice terraces, volcanic landscapes, surf beaches and living Balinese cultural traditions.', tags:['Temples','Rice terraces','Beaches','Sunsets'], best:'Culture & nature', stay:'4–6 days', vibe:'Tropical adventure', attractions:['Ubud and the surrounding rice terraces','Tanah Lot or Uluwatu for coastal temple views','Waterfall and jungle walks around central Bali','Local markets and Balinese food experiences'], style:'Nature', image:'assets/bali.jpg'},
  'Maldives': {region:'INDIAN OCEAN', title:'Maldives', description:'A chain of coral atolls with clear lagoons, white-sand beaches and excellent opportunities for snorkeling and diving.', tags:['Lagoon','Snorkelling','Island stays','Relaxation'], best:'Beach & marine life', stay:'4–5 days', vibe:'Island escape', attractions:['Snorkelling or a guided reef trip','A local-island culture walk','Sunset boat excursion, weather permitting','Beach time and responsible marine-life viewing'], style:'Luxury', image:'assets/maldives.jpg'},
  'Switzerland': {region:'EUROPE', title:'Switzerland', description:'Alpine villages, turquoise lakes, scenic rail journeys and marked hiking routes make Switzerland ideal for mountain lovers.', tags:['Alps','Lakes','Hiking','Scenic trains'], best:'Mountains & viewpoints', stay:'5–7 days', vibe:'Alpine exploration', attractions:['Lauterbrunnen valley and its waterfalls','A viewpoint or cable-car excursion in the Jungfrau region','Lake-side walks around Lucerne or Interlaken','A scenic rail journey through the Alps'], style:'Trekking', image:'assets/switzerland.jpg'},
  'Santorini, Greece': {region:'GREECE', title:'Santorini, Greece', description:'A volcanic island famous for whitewashed villages, blue-domed churches, caldera views and colourful sunsets over the Aegean Sea.', tags:['Caldera views','Villages','Sunsets','Coast'], best:'Views & culture', stay:'3–4 days', vibe:'Coastal discovery', attractions:['Explore the lanes of Oia and Fira','Walk a section of the caldera trail','Visit a black-sand beach','Discover local food and traditional villages'], style:'Nature', image:'assets/greece.jpg'},
  'Thailand': {region:'SOUTHEAST ASIA', title:'Thailand', description:'A varied destination combining tropical islands, limestone cliffs, lively markets, temples and outdoor excursions.', tags:['Karst cliffs','Boats','Food','Nature'], best:'Adventure & beaches', stay:'5–7 days', vibe:'Tropical adventure', attractions:['A responsible boat excursion among limestone karsts','A guided nature or jungle walk','Explore a local night market and regional food','Choose a beach day or a beginner-friendly water activity'], style:'Adventure', image:'assets/thailand.jpg'},
  'Italy': {region:'EUROPE', title:'Italy', description:'Historic towns, coastal villages, art, architecture and regional food make Italy rewarding for culture and scenic travel.', tags:['Coast','Architecture','Food','History'], best:'Culture & coast', stay:'5–7 days', vibe:'Slow exploration', attractions:['Explore a historic town centre on foot','Visit a viewpoint along the Amalfi Coast','Try a local cooking or food experience','Spend time in a museum, piazza or seaside village'], style:'Nature', image:'assets/italy.jpg'},
  'Dubai': {region:'UNITED ARAB EMIRATES', title:'Dubai, UAE', description:'A modern city of striking architecture, waterfront districts, cultural neighbourhoods and desert landscapes just beyond the city.', tags:['Skyline','Architecture','Desert','Shopping'], best:'City views & experiences', stay:'3–5 days', vibe:'Modern city break', attractions:['View the skyline from a public observation area','Explore Al Fahidi Historical Neighbourhood','Visit Dubai Creek and traditional markets','Choose a licensed, responsible desert experience'], style:'Luxury', image:'assets/dubai.jpg'},
  'New Zealand': {region:'OCEANIA', title:'New Zealand', description:'A landscape-rich destination with alpine lakes, dramatic mountain ranges, forests and outdoor trails for many experience levels.', tags:['Alpine lakes','Hiking','Scenic drives','Nature'], best:'Outdoor exploration', stay:'7–10 days', vibe:'Nature adventure', attractions:['Walk a marked trail beside an alpine lake','Visit a scenic viewpoint in a national park','Plan a scenic drive with safe rest stops','Explore a local town and learn about Māori culture respectfully'], style:'Trekking', image:'assets/newzealand.jpg'},
  'Paris': {region:'FRANCE', title:'Paris, France', description:'A walkable city known for landmark architecture, museums, riverside promenades, neighbourhood cafés and a rich artistic history.', tags:['Architecture','Museums','Food','Riverside walks'], best:'Culture & city walks', stay:'3–5 days', vibe:'Classic city break', attractions:['Walk along the Seine and view the Eiffel Tower from public spaces','Explore the Louvre area and nearby historic streets','Discover Montmartre and its hilltop views','Try a bakery and explore local neighbourhood markets'], style:'Nature', image:'assets/deal_paris.jpg'},
  'Tokyo': {region:'JAPAN', title:'Tokyo, Japan', description:'A dynamic city mixing contemporary design, traditional shrines, food districts, gardens and excellent public transport.', tags:['City culture','Food','Gardens','Design'], best:'Food & urban discovery', stay:'4–6 days', vibe:'City exploration', attractions:['Explore Asakusa and Sensō-ji’s surrounding streets','Visit a public garden or park','Discover neighbourhood food streets respectfully','Use rail transit to explore distinct city districts'], style:'Adventure', image:'assets/deal_tokyo.jpg'},
  'New York': {region:'UNITED STATES', title:'New York City, USA', description:'A lively city of iconic skyline views, museums, parks, diverse neighbourhoods and waterfront walks.', tags:['Skyline','Museums','Parks','Neighbourhoods'], best:'City & culture', stay:'4–6 days', vibe:'Urban adventure', attractions:['Walk through Central Park','Explore a museum that matches your interests','See the skyline from a public waterfront promenade','Discover local food and neighbourhood culture'], style:'Adventure', image:'assets/deal_newyork.jpg'}
};
const destinationModal = $('#destinationModal');
function openDestinationGuide(card){
  const place = card.dataset.place;
  const guideKey = place.startsWith('Thailand') ? 'Thailand' : place.startsWith('Italy') ? 'Italy' : place.startsWith('Dubai') ? 'Dubai' : place;
  const guide = destinationGuides[guideKey] || destinationGuides['Bali, Indonesia'];
  $('#modalPhoto').src = guide.image;
  $('#modalPhoto').alt = guide.title + ' travel landscape';
  $('#modalRegion').textContent = guide.region;
  $('#modalTitle').textContent = guide.title;
  $('#modalDescription').textContent = guide.description;
  $('#modalTags').innerHTML = guide.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join('');
  $('#modalBestFor').textContent = guide.best;
  $('#modalStay').textContent = guide.stay;
  $('#modalVibe').textContent = guide.vibe;
  $('#modalAttractions').innerHTML = guide.attractions.map(item => `<li>${escapeHtml(item)}</li>`).join('');
  $('#modalPlanBtn').dataset.place = place;
  $('#modalPlanBtn').dataset.style = guide.style;
  destinationModal.classList.add('open');
  destinationModal.setAttribute('aria-hidden','false');
  document.body.classList.add('modal-open');
}
function closeDestinationGuide(){
  destinationModal.classList.remove('open');
  destinationModal.setAttribute('aria-hidden','true');
  document.body.classList.remove('modal-open');
}
$$('.destination-card').forEach(card => {
  card.setAttribute('tabindex','0');
  card.setAttribute('role','button');
  card.setAttribute('aria-label',`View details for ${card.dataset.place}`);
  card.addEventListener('click', (event) => {
    if(event.target.closest('.heart')) return;
    openDestinationGuide(card);
  });
  card.addEventListener('keydown', event => {
    if(event.key === 'Enter' || event.key === ' '){ event.preventDefault(); openDestinationGuide(card); }
  });
});
$('#modalClose').addEventListener('click', closeDestinationGuide);
destinationModal.querySelectorAll('[data-close-modal]').forEach(el=>el.addEventListener('click',closeDestinationGuide));
document.addEventListener('keydown',event=>{if(event.key==='Escape') closeDestinationGuide();});
$('#modalPlanBtn').addEventListener('click',()=>{
  $('#destination').value=$('#modalPlanBtn').dataset.place;
  $('#style').value=$('#modalPlanBtn').dataset.style;
  closeDestinationGuide();
  scrollToPlanner();
  showToast(`${$('#destination').value} added to your trip plan.`);
});


// AI deal cards open the same detailed destination guide.
$$('.deal-card').forEach(card=>{
  card.style.cursor='pointer';
  card.setAttribute('tabindex','0');
  card.setAttribute('role','button');
  const title=(card.querySelector('h3,h4,.deal-title')?.textContent||'').trim().toLowerCase();
  const dealPlace=title.includes('santorini')?'Santorini, Greece':title.includes('paris')?'Paris':title.includes('tokyo')?'Tokyo':title.includes('new york')?'New York':'Bali, Indonesia';
  card.addEventListener('click',event=>{
    if(event.target.closest('button')) return;
    openDestinationGuide({dataset:{place:dealPlace}});
  });
  card.addEventListener('keydown',event=>{
    if(event.key==='Enter'||event.key===' '){event.preventDefault();openDestinationGuide({dataset:{place:dealPlace}});}
  });
});
// Experience tiles route the selected interest into the planner.
$$('.experience-card').forEach(card=>{
  card.style.cursor='pointer';
  card.setAttribute('tabindex','0');
  const title=(card.querySelector('h3,h4')?.textContent||'').toLowerCase();
  const chosenStyle=title.includes('trek')||title.includes('hiking')?'Trekking':title.includes('island')?'Adventure':title.includes('culture')?'Family':'Nature';
  const chooseExperience=()=>{
    $('#style').value=chosenStyle;
    $('#destination').value=chosenStyle==='Trekking'?'Switzerland':chosenStyle==='Adventure'?'Thailand, Phuket':chosenStyle==='Family'?'Italy, Amalfi Coast':'New Zealand';
    scrollToPlanner();
    showToast(`${card.querySelector('h3,h4')?.textContent||'Experience'} selected for your planner.`);
  };
  card.addEventListener('click',chooseExperience);
  card.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();chooseExperience();}});
});

$$('.heart').forEach(btn => btn.addEventListener('click', (event) => {
  event.stopPropagation();
  btn.classList.toggle('saved');
  btn.textContent = btn.classList.contains('saved') ? '♥' : '♡';
  showToast(btn.classList.contains('saved') ? 'Destination saved.' : 'Destination removed from saved list.');
}));

const recommendations = {
  Adventure:['Adventure activity + scenic viewpoint','River or valley experience + local food','Sunrise exploration + hidden route','Outdoor adventure + sunset location'],
  Trekking:['Guided mountain trail + viewpoint','Forest trek + local village walk','Sunrise hike + photography stop','Nature trail + relaxed evening'],
  Nature:['Lake or valley exploration','Waterfall + forest experience','Sunrise viewpoint + nature walk','Eco-friendly local experience'],
  Luxury:['Premium stay + curated sightseeing','Private scenic experience','Sunset fine-dining + city views','Wellness + relaxed exploration'],
  Family:['Easy sightseeing + local market','Family-friendly nature experience','Cultural attraction + food walk','Relaxed scenic day + local activity']
};

const SAVED_TRIPS_KEY = 'wanderwise-saved-trips';

function saveCurrentTrip() {
  const result = document.querySelector('#result');
  const destinationInput = document.querySelector('#destination');

  const destination =
    destinationInput.value.trim() || 'Manali, India';

  if (!result || !result.querySelector('.day')) {
    showToast('Please generate a trip plan first.');
    return;
  }

  const trip = {
    id: Date.now(),
    destination: destination,
    planHtml: result.innerHTML,
    savedAt: new Date().toISOString()
  };

  try {
    const savedTrips = JSON.parse(
      localStorage.getItem(SAVED_TRIPS_KEY) || '[]'
    );

    if (!Array.isArray(savedTrips)) {
      throw new Error('Invalid saved trips data');
    }

    savedTrips.push(trip);

    localStorage.setItem(
      SAVED_TRIPS_KEY,
      JSON.stringify(savedTrips)
    );

    showToast(`"${destination}" trip saved successfully!`);
  } catch (error) {
    showToast('Could not save trip. Check browser storage settings.');
  }
}
function renderSavedTrips() {
  const container = document.querySelector('#savedTripsContainer');
  if (!container) return;

  let trips = [];

  try {
    const saved = JSON.parse(
      localStorage.getItem('wanderwise-saved-trips') || '[]'
    );

    trips = Array.isArray(saved) ? saved : [];
  } catch {
    trips = [];
  }

  // Update total saved trips counter
const countElement = document.querySelector('#savedTripsCount');

if (countElement) {
  countElement.textContent = trips.length;
}

  if (trips.length === 0) {
    container.innerHTML = `
      <div class="empty-trips">
        <h3>No saved trips yet!</h3>
        <p>Generate a trip plan and click SAVE TRIP to keep it here.</p>
        <button class="small-btn" onclick="scrollToPlanner()">
          PLAN A TRIP
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = trips.map(trip => `
    <article class="saved-trip-card">
      <div class="saved-trip-info">
        <span class="section-tag">SAVED ADVENTURE</span>
        <h3>${escapeTripText(trip.destination)}</h3>
        <p>Saved on ${new Date(trip.savedAt).toLocaleDateString()}</p>
      </div>

      <div class="saved-trip-actions">
        <button class="small-btn"
          onclick="viewSavedTrip(${Number(trip.id)})">
          <button class="small-btn"
  onclick="exportSavedTrip(${Number(trip.id)})">
  EXPORT
</button>
          VIEW TRIP
        </button>

        <button class="small-btn"
          onclick="deleteSavedTrip(${Number(trip.id)})">
          DELETE
        </button>
      </div>
    </article>
  `).join('');
}

function escapeTripText(value) {
  return String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

function viewSavedTrip(id) {
  let trips = [];

  try {
    trips = JSON.parse(
      localStorage.getItem('wanderwise-saved-trips') || '[]'
    );
  } catch {
    showToast('Could not load saved trips.');
    return;
  }

  if (!Array.isArray(trips)) {
    showToast('Saved trips data is invalid.');
    return;
  }

  const trip = trips.find(item => item.id === id);
  if (!trip) {
    showToast('Saved trip not found.');
    renderSavedTrips();
    return;
  }

  const result = document.querySelector('#result');
  if (!result) return;

  result.innerHTML = trip.planHtml;

  const actions = document.querySelector('#resultActions');
  if (actions) actions.hidden = false;

  result.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function exportSavedTrip(id) {
  let trips = [];

  try {
    trips = JSON.parse(
      localStorage.getItem('wanderwise-saved-trips') || '[]'
    );
  } catch {
    showToast('Could not load saved trips.');
    return;
  }

  if (!Array.isArray(trips)) {
    showToast('Saved trips data is invalid.');
    return;
  }

  const trip = trips.find(item => item.id === id);

  if (!trip) {
    showToast('Saved trip not found.');
    return;
  }

  const temporaryElement = document.createElement('div');
  temporaryElement.innerHTML = trip.planHtml;

  const planText = temporaryElement.innerText ||
                   temporaryElement.textContent || '';

  const fileContent =
    `WanderWise - Saved Trip\n` +
    `Destination: ${trip.destination}\n` +
    `Saved on: ${new Date(trip.savedAt).toLocaleDateString()}\n\n` +
    `TRIP PLAN\n` +
    `================================\n\n` +
    planText;

  const blob = new Blob([fileContent], {
    type: 'text/plain;charset=utf-8'
  });

  const downloadUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');

  const safeDestination = String(trip.destination)
    .replace(/[^a-z0-9_-]/gi, '_');

  link.href = downloadUrl;
  link.download = `${safeDestination}_Trip_Plan.txt`;

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(downloadUrl);

  showToast('Trip plan downloaded successfully!');
}

function clearAllTrips() {
  let trips;

  try {
    trips = JSON.parse(
      localStorage.getItem(SAVED_TRIPS_KEY) || '[]'
    );

    if (!Array.isArray(trips)) {
      throw new Error('Invalid saved trips data');
    }
  } catch (error) {
    showToast('Could not load saved trips.');
    return;
  }

  if (trips.length === 0) {
    showToast('There are no saved trips to delete.');
    return;
  }

  const confirmed = confirm(
    `Are you sure you want to delete all ${trips.length} saved trips? This action cannot be undone.`
  );

  if (!confirmed) {
    return;
  }

  try {
    localStorage.removeItem(SAVED_TRIPS_KEY);
    renderSavedTrips();
    showToast('All saved trips have been deleted.');
  } catch (error) {
    showToast('Could not delete saved trips.');
  }
}

function deleteSavedTrip(id) {
  if (!confirm('Are you sure you want to delete this saved trip?')) {
    return;
  }

  try {
    const trips = JSON.parse(
      localStorage.getItem('wanderwise-saved-trips') || '[]'
    );

    if (!Array.isArray(trips)) {
      throw new Error('Invalid saved trips data');
    }

    const updatedTrips = trips.filter(trip => trip.id !== id);

    localStorage.setItem(
      'wanderwise-saved-trips',
      JSON.stringify(updatedTrips)
    );

    renderSavedTrips();
    showToast('Saved trip deleted.');
  } catch {
    showToast('Could not delete the trip.');
  }
}

function generatePlan(){
  const destination = $('#destination').value.trim() || 'Manali, India';
  const days = Math.max(1, Math.min(14, Number($('#days').value) || 5));
  const budget = Number($('#budget').value) || 30000;
  const style = $('#style').value;
  const result = $('#result');
  const actions = $('#resultActions');
  const status = $('#planStatus');

  status.textContent='PLANNING';
  actions.hidden=true;
  result.innerHTML = `<div class="loading-state"><div class="loader"></div><b>WanderWise AI is designing your journey...</b><small>Matching routes, activities and budget</small></div>`;

  setTimeout(() => {
    const list = recommendations[style];
    const daily = Array.from({length:days},(_,i)=>list[i%list.length]);
    const estimated = Math.round(budget * .78);
    let html = `<h3 class="result-title">✦ ${escapeHtml(destination)} — ${style} Plan</h3><div class="result-meta">${days} days • Budget ₹${budget.toLocaleString('en-IN')} • AI-personalized prototype</div>`;
    daily.forEach((activity,i)=>{
      html += `<div class="day"><b>DAY ${i+1}</b><span>${activity}<small>AI suggestion • flexible timing • budget-aware planning</small></span></div>`;
    });
    html += `<div class="cost-line">Estimated planning range: <strong>₹${estimated.toLocaleString('en-IN')} – ₹${budget.toLocaleString('en-IN')}</strong> per traveller.</div>`;
    result.innerHTML=html;
    actions.hidden=false;
    status.textContent='READY';
    result.scrollTop=0;
  }, 900);
}

function escapeHtml(value){
  return value.replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[ch]));
}

// AI assistant prototype
const assistantBtn = $('#assistantBtn');
const chatPanel = $('#chatPanel');
const chatClose = $('#chatClose');
assistantBtn.addEventListener('click',()=>{
  chatPanel.classList.toggle('open');
  chatPanel.setAttribute('aria-hidden',String(!chatPanel.classList.contains('open')));
});
chatClose.addEventListener('click',()=>{chatPanel.classList.remove('open');chatPanel.setAttribute('aria-hidden','true');});

function addChat(text, type){
  const div=document.createElement('div');
  div.className=`chat-msg ${type}`;
  div.textContent=text;
  $('#chatBody').appendChild(div);
  $('#chatBody').scrollTop=$('#chatBody').scrollHeight;
}

function assistantReply(message){
  const m=message.toLowerCase();
  if(m.includes('mountain')||m.includes('trek')) return 'For a mountain-focused trip, choose Trekking and add interests such as hiking, viewpoints and sunrise. Switzerland, New Zealand and Manali are strong starting points.';
  if(m.includes('5-day')||m.includes('five-day')) return 'For 5 days, I recommend one main activity per day, with a lighter arrival/departure day. Set Travel Days to 5 and click Generate Plan.';
  if(m.includes('budget')) return 'WanderWise is designed to keep your target budget visible while generating a practical itinerary. You can choose ₹15K, ₹30K, ₹50K or ₹1L+ in this prototype.';
  return 'I can help you choose a destination, travel style, trip length or budget. Try asking about a 5-day adventure or mountain trip.';
}

$('#chatForm').addEventListener('submit',(e)=>{
  e.preventDefault(); const input=$('#chatInput'); const message=input.value.trim(); if(!message) return;
  addChat(message,'user'); input.value='';
  setTimeout(()=>addChat(assistantReply(message),'bot'),450);
});
$$('.chat-suggestions button').forEach(btn=>btn.addEventListener('click',()=>{
  const input=$('#chatInput'); input.value=btn.dataset.q; input.focus();
}));

let toastTimer;
function showToast(message){
  const toast=$('#toast'); toast.textContent=message; toast.classList.add('show');
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>toast.classList.remove('show'),2200);
}

// Active navigation on scroll
const sections=[...document.querySelectorAll('main section[id]')];
const navLinks=[...document.querySelectorAll('.desktop-nav a')];
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${entry.target.id}`));
    }
  });
},{rootMargin:'-35% 0px -55% 0px'});
sections.forEach(section=>observer.observe(section));

// Keep the demo safe when opened without a backend/API.
window.WanderWise = { generatePlan, scrollToPlanner, showToast };

// Initialize saved trips when the page loads
document.addEventListener('DOMContentLoaded', renderSavedTrips);

// Search saved trips by destination
document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.querySelector('#tripSearch');

  if (!searchInput) return;

  searchInput.addEventListener('input', function () {
    const searchText = this.value.trim().toLowerCase();
    const tripCards = document.querySelectorAll('.saved-trip-card');

    tripCards.forEach(function (card) {
      const destination = card
        .querySelector('h3')
        ?.textContent.toLowerCase() || '';

      card.style.display = destination.includes(searchText)
        ? ''
        : 'none';
    });
  });
});