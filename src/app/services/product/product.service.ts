import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      brand: 'Orient',
      title: 'Relógio Orient Submariner',
      price: 1999.00,
      gender: 'Masculino',
      line: 'Automático',
      style: 'Diver',
      mechanism: 'Cronógrafo',
      boxFormat: 'Redonda – 40 mm de diâmetro, 11 mm de espessura',
      boxMaterial: 'Aço Inox',
      dial: 'Prata Sunray, indexes grandes e luminosos, calendário entre 4h e 5h',
      images: [
        'https://golden.vtexassets.com/arquivos/ids/2939097-800-800/Relogio-Masculino-Solar-Tech-Orient-Prata-MBSS1448-P2SX.jpg'
      ]
    },
    {
      id: 2,
      brand: 'Omega',
      title: 'Relógio Omega Seamaster Diver',
      price: 19999.00,
      gender: 'Masculino',
      line: 'Automático',
      style: 'Diver',
      mechanism: 'Co-Axial Master Chronometer',
      boxFormat: 'Redonda – 42 mm de diâmetro, 13 mm de espessura',
      boxMaterial: 'Aço Inox',
      dial: 'Azul com padrão de onda, índices e ponteiros revestidos com Super-LumiNova',
      images: [
        'https://placeholder-image.com/omega-seamaster.jpg' // Placeholder
      ]
    },
    {
      id: 3,
      brand: 'Rolex',
      title: 'Relógio Rolex Oyster Perpetual Submariner',
      price: 15999.00,
      gender: 'Masculino',
      line: 'Automático',
      style: 'Diver',
      mechanism: 'Perpetual',
      boxFormat: 'Redonda – 41 mm de diâmetro, 12 mm de espessura',
      boxMaterial: 'Oystersteel',
      dial: 'Preto, índices e ponteiros Chromalight',
      images: [
        'https://golden.vtexassets.com/arquivos/ids/2939099-800-800/Relogio-Masculino-Solar-Tech-Orient-Prata-MBSS1448-P2SX.jpg' // Placeholder
      ]
    },
    // --- NOVOS 30 RELÓGIOS ADICIONADOS ---
    {
      id: 4,
      brand: 'Patek Philippe',
      title: 'Relógio Patek Philippe Grandmaster Chime',
      price: 160000000.00,
      gender: 'Masculino',
      line: 'Complication',
      style: 'Luxo Extremo',
      mechanism: 'Manual (Grande Complicação)',
      boxFormat: 'Reversível – 47.7 mm de diâmetro',
      boxMaterial: 'Ouro Branco',
      dial: 'Opalescente castanho (lado da hora) e ébano preto (lado do calendário perpétuo)',
      images: [
        'https://placeholder-image.com/patek-philippe-grandmaster-chime.jpg' // Placeholder
      ]
    },
    {
      id: 5,
      brand: 'Audemars Piguet',
      title: 'Relógio Audemars Piguet Royal Oak "Jumbo" Extra-Thin',
      price: 350000.00,
      gender: 'Masculino',
      line: 'Royal Oak',
      style: 'Esportivo de Luxo',
      mechanism: 'Automático',
      boxFormat: 'Octogonal – 39 mm de diâmetro',
      boxMaterial: 'Aço Inox',
      dial: 'Azul "Petite Tapisserie", índices aplicados em ouro branco',
      images: [
        'https://placeholder-image.com/audemars-piguet-royal-oak.jpg' // Placeholder
      ]
    },
    {
      id: 6,
      brand: 'Richard Mille',
      title: 'Relógio Richard Mille RM 56-02 Sapphire',
      price: 12000000.00,
      gender: 'Masculino',
      line: 'RM 56',
      style: 'Tecnológico Extremo',
      mechanism: 'Manual (Tourbillon)',
      boxFormat: 'Tonneau – 50 mm de largura',
      boxMaterial: 'Safira (Caixa Transparente)',
      dial: 'Esqueleto (Movimento visível)',
      images: [
        'https://placeholder-image.com/richard-mille-rm-56-02.jpg' // Placeholder
      ]
    },
    {
      id: 7,
      brand: 'Cartier',
      title: 'Relógio Cartier Tank Must',
      price: 25000.00,
      gender: 'Masculino/Feminino',
      line: 'Tank',
      style: 'Clássico Formal',
      mechanism: 'Quartzo',
      boxFormat: 'Retangular – Tamanho grande (33.7 x 25.5 mm)',
      boxMaterial: 'Aço Inox',
      dial: 'Prateado, algarismos romanos, ponteiros em forma de espada azulados',
      images: [
        'https://placeholder-image.com/cartier-tank-must.jpg' // Placeholder
      ]
    },
    {
      id: 8,
      brand: 'Vacheron Constantin',
      title: 'Relógio Vacheron Constantin Overseas Automático',
      price: 180000.00,
      gender: 'Masculino',
      line: 'Overseas',
      style: 'Viagem/Esportivo de Luxo',
      mechanism: 'Automático',
      boxFormat: 'Redonda/Octogonal – 41 mm de diâmetro',
      boxMaterial: 'Aço Inox',
      dial: 'Azul laqueado, com acabamento acetinado com raios de sol',
      images: [
        'https://placeholder-image.com/vacheron-constantin-overseas.jpg' // Placeholder
      ]
    },
    {
      id: 9,
      brand: 'Jaeger-LeCoultre',
      title: 'Relógio Jaeger-LeCoultre Reverso Classic Large Duoface',
      price: 90000.00,
      gender: 'Masculino',
      line: 'Reverso',
      style: 'Clássico Reversível',
      mechanism: 'Manual (Duoface)',
      boxFormat: 'Retangular – 47 x 28.3 mm',
      boxMaterial: 'Aço Inox',
      dial: 'Prateado guilloché (dia) e Preto Clous de Paris (noite)',
      images: [
        'https://placeholder-image.com/jlc-reverso.jpg' // Placeholder
      ]
    },
    {
      id: 10,
      brand: 'IWC Schaffhausen',
      title: 'Relógio IWC Pilot’s Watch Chronograph 41',
      price: 45000.00,
      gender: 'Masculino',
      line: 'Pilot\'s Watches',
      style: 'Aviação/Cronógrafo',
      mechanism: 'Automático (Cronógrafo)',
      boxFormat: 'Redonda – 41 mm de diâmetro',
      boxMaterial: 'Aço Inox',
      dial: 'Azul com luminescência',
      images: [
        'https://placeholder-image.com/iwc-pilot-chronograph.jpg' // Placeholder
      ]
    },
    {
      id: 11,
      brand: 'Breitling',
      title: 'Relógio Breitling Navitimer B01 Chronograph 43',
      price: 55000.00,
      gender: 'Masculino',
      line: 'Navitimer',
      style: 'Aviação/Cronógrafo',
      mechanism: 'Automático (B01 COSC)',
      boxFormat: 'Redonda – 43 mm de diâmetro',
      boxMaterial: 'Aço Inox',
      dial: 'Prata com submostradores pretos (Panda)',
      images: [
        'https://placeholder-image.com/breitling-navitimer.jpg' // Placeholder
      ]
    },
    {
      id: 12,
      brand: 'Hublot',
      title: 'Relógio Hublot Big Bang Integral Black Magic',
      price: 95000.00,
      gender: 'Masculino',
      line: 'Big Bang',
      style: 'Esportivo Moderno',
      mechanism: 'Automático (Cronógrafo Skeleton)',
      boxFormat: 'Redonda – 42 mm de diâmetro',
      boxMaterial: 'Cerâmica Preta',
      dial: 'Esqueleto (Preto)',
      images: [
        'https://placeholder-image.com/hublot-big-bang.jpg' // Placeholder
      ]
    },
    {
      id: 13,
      brand: 'Montblanc',
      title: 'Relógio Montblanc Star Legacy Automatic Date',
      price: 18000.00,
      gender: 'Masculino',
      line: 'Star Legacy',
      style: 'Clássico Formal',
      mechanism: 'Automático',
      boxFormat: 'Redonda – 39 mm de diâmetro',
      boxMaterial: 'Aço Inox',
      dial: 'Prateado/Branco, algarismos árabes, ponteiros folheados a ouro rosa',
      images: [
        'https://placeholder-image.com/montblanc-star-legacy.jpg' // Placeholder
      ]
    },
    {
      id: 14,
      brand: 'Panerai',
      title: 'Relógio Panerai Luminor Marina Carbotech',
      price: 75000.00,
      gender: 'Masculino',
      line: 'Luminor',
      style: 'Militar/Diver',
      mechanism: 'Automático',
      boxFormat: 'Almofada – 44 mm de diâmetro',
      boxMaterial: 'Carbotech™ (Fibra de Carbono)',
      dial: 'Preto "Sandwich" com Super-LumiNova™ azul',
      images: [
        'https://placeholder-image.com/panerai-luminor-carbotech.jpg' // Placeholder
      ]
    },
    {
      id: 15,
      brand: 'A. Lange & Söhne',
      title: 'Relógio A. Lange & Söhne Lange 1',
      price: 450000.00,
      gender: 'Masculino',
      line: 'Lange 1',
      style: 'Clássico de Luxo',
      mechanism: 'Manual (Grande Data)',
      boxFormat: 'Redonda/Assimétrica – 38.5 mm de diâmetro',
      boxMaterial: 'Ouro Rosa',
      dial: 'Prata sólida (Argenté), submostrador descentralizado',
      images: [
        'https://placeholder-image.com/lange-sohne-lange-1.jpg' // Placeholder
      ]
    },
    {
      id: 16,
      brand: 'Seiko',
      title: 'Relógio Seiko Prospex Speedtimer Solar Chronograph',
      price: 4500.00,
      gender: 'Masculino',
      line: 'Prospex',
      style: 'Esportivo/Cronógrafo',
      mechanism: 'Solar (V192)',
      boxFormat: 'Redonda – 39 mm de diâmetro',
      boxMaterial: 'Aço Inox',
      dial: 'Branco com submostradores pretos (Panda)',
      images: [
        'https://placeholder-image.com/seiko-speedtimer-solar.jpg' // Placeholder
      ]
    },
    {
      id: 17,
      brand: 'Bulova',
      title: 'Relógio Bulova Lunar Pilot Chronograph',
      price: 3500.00,
      gender: 'Masculino',
      line: 'Special Edition',
      style: 'Histórico/Cronógrafo',
      mechanism: 'Quartzo de alta performance (262 kHz)',
      boxFormat: 'Redonda – 45 mm de diâmetro',
      boxMaterial: 'Aço Inox',
      dial: 'Preto fosco, marcadores em tom creme',
      images: [
        'https://placeholder-image.com/bulova-lunar-pilot.jpg' // Placeholder
      ]
    },
    {
      id: 18,
      brand: 'Victorinox',
      title: 'Relógio Victorinox I.N.O.X. Carbon',
      price: 6800.00,
      gender: 'Masculino',
      line: 'I.N.O.X.',
      style: 'Tático/Resistente',
      mechanism: 'Quartzo Suíço',
      boxFormat: 'Redonda – 43 mm de diâmetro',
      boxMaterial: 'Carbono',
      dial: 'Preto, marcadores em Super-LumiNova',
      images: [
        'https://placeholder-image.com/victorinox-inox-carbon.jpg' // Placeholder
      ]
    },
    {
      id: 19,
      brand: 'Zenith',
      title: 'Relógio Zenith El Primero Chronomaster Sport',
      price: 65000.00,
      gender: 'Masculino',
      line: 'Chronomaster',
      style: 'Esportivo/Cronógrafo',
      mechanism: 'Automático (El Primero 3600)',
      boxFormat: 'Redonda – 41 mm de diâmetro',
      boxMaterial: 'Aço Inox',
      dial: 'Branco, submostradores em cores diferentes (tri-color)',
      images: [
        'https://placeholder-image.com/zenith-chronomaster-sport.jpg' // Placeholder
      ]
    },
    {
      id: 20,
      brand: 'Tag Heuer',
      title: 'Relógio Tag Heuer Carrera Calibre Heuer 02T Tourbillon Nanograph',
      price: 150000.00,
      gender: 'Masculino',
      line: 'Carrera',
      style: 'Esportivo de Alta Precisão',
      mechanism: 'Automático (Tourbillon)',
      boxFormat: 'Redonda – 45 mm de diâmetro',
      boxMaterial: 'Titânio e Carbono',
      dial: 'Esqueleto com detalhes amarelos',
      images: [
        'https://placeholder-image.com/tag-heuer-tourbillon.jpg' // Placeholder
      ]
    },
    {
      id: 21,
      brand: 'Longines',
      title: 'Relógio Longines HydroConquest Automático',
      price: 12500.00,
      gender: 'Masculino',
      line: 'HydroConquest',
      style: 'Diver',
      mechanism: 'Automático (Calibre L888)',
      boxFormat: 'Redonda – 41 mm de diâmetro',
      boxMaterial: 'Aço Inox',
      dial: 'Preto com grandes numerais e marcadores Super-LumiNova',
      images: [
        'https://placeholder-image.com/longines-hydroconquest.jpg' // Placeholder
      ]
    },
    {
      id: 22,
      brand: 'Tudor',
      title: 'Relógio Tudor Black Bay Fifty-Eight',
      price: 25000.00,
      gender: 'Masculino',
      line: 'Black Bay',
      style: 'Vintage Diver',
      mechanism: 'Automático (MT5402 COSC)',
      boxFormat: 'Redonda – 39 mm de diâmetro',
      boxMaterial: 'Aço Inox',
      dial: 'Preto, detalhes dourados (gilt)',
      images: [
        'https://placeholder-image.com/tudor-black-bay-58.jpg' // Placeholder
      ]
    },
    {
      id: 23,
      brand: 'Jacob & Co.',
      title: 'Relógio Jacob & Co. Billionaire Watch II',
      price: 100000000.00,
      gender: 'Masculino',
      line: 'Billionaire',
      style: 'Joalheria Extrema',
      mechanism: 'Esqueleto Manual',
      boxFormat: 'Retangular – 44 x 50 mm',
      boxMaterial: 'Ouro Branco cravejado com Diamantes',
      dial: 'Esqueleto (Totalmente coberto por diamantes)',
      images: [
        'https://placeholder-image.com/jacob-co-billionaire.jpg' // Placeholder
      ]
    },
    {
      id: 24,
      brand: 'Chopard',
      title: 'Relógio Chopard Happy Sport',
      price: 48000.00,
      gender: 'Feminino',
      line: 'Happy Sport',
      style: 'Casual de Luxo',
      mechanism: 'Automático',
      boxFormat: 'Redonda – 33 mm de diâmetro',
      boxMaterial: 'Aço Inox e Ouro Rosa',
      dial: 'Madrepérola com 5 diamantes flutuantes',
      images: [
        'https://placeholder-image.com/chopard-happy-sport.jpg' // Placeholder
      ]
    },
    {
      id: 25,
      brand: 'Piaget',
      title: 'Relógio Piaget Altiplano Ultimate Automatic',
      price: 250000.00,
      gender: 'Masculino',
      line: 'Altiplano',
      style: 'Ultra-Fino',
      mechanism: 'Automático (Calibre 910P)',
      boxFormat: 'Redonda – 41 mm de diâmetro',
      boxMaterial: 'Ouro Rosa',
      dial: 'Preto fosco, submostrador de horas/minutos',
      images: [
        'https://placeholder-image.com/piaget-altiplano.jpg' // Placeholder
      ]
    },
    {
      id: 26,
      brand: 'Blancpain',
      title: 'Relógio Blancpain Fifty Fathoms Automatique',
      price: 85000.00,
      gender: 'Masculino',
      line: 'Fifty Fathoms',
      style: 'Diver Clássico',
      mechanism: 'Automático (Calibre 1315)',
      boxFormat: 'Redonda – 45 mm de diâmetro',
      boxMaterial: 'Aço Inox',
      dial: 'Preto, marcadores luminosos, bisel em safira',
      images: [
        'https://placeholder-image.com/blancpain-fifty-fathoms.jpg' // Placeholder
      ]
    },
    {
      id: 27,
      brand: 'Breguet',
      title: 'Relógio Breguet Marine Chronographe 5527',
      price: 110000.00,
      gender: 'Masculino',
      line: 'Marine',
      style: 'Navegação/Esportivo de Luxo',
      mechanism: 'Automático (Cronógrafo)',
      boxFormat: 'Redonda – 42.3 mm de diâmetro',
      boxMaterial: 'Titânio',
      dial: 'Sol cinza "Slate", ponteiros Breguet luminescentes',
      images: [
        'https://placeholder-image.com/breguet-marine.jpg' // Placeholder
      ]
    },
    {
      id: 28,
      brand: 'Tommy Hilfiger',
      title: 'Relógio Tommy Hilfiger Casual Sport',
      price: 1290.00,
      gender: 'Masculino',
      line: 'Sport',
      style: 'Fashion Casual',
      mechanism: 'Quartzo',
      boxFormat: 'Redonda – 44 mm de diâmetro',
      boxMaterial: 'Aço Inox',
      dial: 'Azul com submostradores multifuncionais',
      images: [
        'https://placeholder-image.com/tommy-hilfiger-sport.jpg' // Placeholder
      ]
    },
    {
      id: 29,
      brand: 'Calvin Klein',
      title: 'Relógio Calvin Klein Minimal',
      price: 1550.00,
      gender: 'Feminino',
      line: 'Minimal',
      style: 'Fashion Elegante',
      mechanism: 'Quartzo',
      boxFormat: 'Redonda – 35 mm de diâmetro',
      boxMaterial: 'Aço Inox',
      dial: 'Prateado Sunray, minimalista, sem numerais',
      images: [
        'https://placeholder-image.com/calvin-klein-minimal.jpg' // Placeholder
      ]
    },
    {
      id: 30,
      brand: 'Michael Kors',
      title: 'Relógio Michael Kors Lexington Chronograph',
      price: 1890.00,
      gender: 'Feminino',
      line: 'Lexington',
      style: 'Fashion Glamour',
      mechanism: 'Quartzo (Cronógrafo)',
      boxFormat: 'Redonda – 38 mm de diâmetro',
      boxMaterial: 'Aço Inox Banhado a Ouro',
      dial: 'Dourado com marcadores em cristal',
      images: [
        'https://placeholder-image.com/michael-kors-lexington.jpg' // Placeholder
      ]
    },
    {
      id: 31,
      brand: 'Empório Armani',
      title: 'Relógio Empório Armani Classic',
      price: 2500.00,
      gender: 'Masculino',
      line: 'Classic',
      style: 'Elegante',
      mechanism: 'Quartzo',
      boxFormat: 'Redonda – 43 mm de diâmetro',
      boxMaterial: 'Aço Inox',
      dial: 'Cinza com indexes em bastão e logo da águia',
      images: [
        'https://placeholder-image.com/armani-classic.jpg' // Placeholder
      ]
    },
    {
      id: 32,
      brand: 'Guess',
      title: 'Relógio Guess Phoenix Multi-função',
      price: 1450.00,
      gender: 'Masculino',
      line: 'Phoenix',
      style: 'Fashion Urbano',
      mechanism: 'Quartzo (Multi-função)',
      boxFormat: 'Redonda – 46 mm de diâmetro',
      boxMaterial: 'Aço Inox Preto',
      dial: 'Preto, detalhes em tom de ouro rosa',
      images: [
        'https://placeholder-image.com/guess-phoenix.jpg' // Placeholder
      ]
    },
    {
      id: 33,
      brand: 'Swarovski',
      title: 'Relógio Swarovski Crystalline Aura',
      price: 3200.00,
      gender: 'Feminino',
      line: 'Crystalline',
      style: 'Joalheria',
      mechanism: 'Quartzo',
      boxFormat: 'Redonda – 35 mm de diâmetro',
      boxMaterial: 'Aço Inox',
      dial: 'Branco prateado preenchido com cristais Swarovski',
      images: [
        'https://placeholder-image.com/swarovski-crystalline-aura.jpg' // Placeholder
      ]
    },
    {
      id: 34,
      brand: 'Hamilton',
      title: 'Relógio Hamilton Khaki Field Mechanical',
      price: 4900.00,
      gender: 'Masculino',
      line: 'Khaki Field',
      style: 'Militar/Aventura',
      mechanism: 'Manual',
      boxFormat: 'Redonda – 38 mm de diâmetro',
      boxMaterial: 'Aço Inox',
      dial: 'Preto, numerais grandes, 24 horas internas',
      images: [
        'https://placeholder-image.com/hamilton-khaki-field.jpg' // Placeholder
      ]
    },
    {
      id: 35,
      brand: 'Ulysse Nardin',
      title: 'Relógio Ulysse Nardin Diver Chronometer',
      price: 80000.00,
      gender: 'Masculino',
      line: 'Diver',
      style: 'Diver Profissional',
      mechanism: 'Automático (COSC)',
      boxFormat: 'Redonda – 44 mm de diâmetro',
      boxMaterial: 'Titânio',
      dial: 'Azul com reserva de marcha e pequeno segundos',
      images: [
        'https://placeholder-image.com/ulysse-nardin-diver.jpg' // Placeholder
      ]
    },
    {
      id: 36,
      brand: 'Citizen',
      title: 'Relógio Citizen Eco-Drive Promaster Diver',
      price: 2800.00,
      gender: 'Masculino',
      line: 'Promaster',
      style: 'Diver',
      mechanism: 'Eco-Drive (Solar)',
      boxFormat: 'Redonda – 44 mm de diâmetro',
      boxMaterial: 'Aço Inox',
      dial: 'Azul, marcadores grandes e luminosos',
      images: [
        'https://placeholder-image.com/citizen-promaster-eco-drive.jpg' // Placeholder
      ]
    }
  ];

  public getAll(): Product[] {
    return this.products;
  }

  public getById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }
}
