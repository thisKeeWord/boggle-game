var expect = require('chai').expect;
var Boggle = require('../lib/boggle');

describe('Boggle solver', () => {
  var ans = [
    'ARE', 'AGO', 'AGE', 'ERA', 'EGG', 'ERR', 'EGO', 'ERG', 'EVE', 'ERE', 'EAR', 'JOG', 'KEG',
    'OVA', 'OAK', 'OAR', 'ORE', 'ROE', 'REV', 'RAG', 'AVER', 'EVER', 'EAVE', 'ERGO', 'GROG',
    'GEAR', 'GAVE', 'GORE', 'OVER', 'OGRE', 'RAVE', 'RAKE', 'REAR', 'ROAR', 'RAGE', 'RARE', 'ROVE',
    'ERROR', 'EAGER', 'GORGE', 'GROVE', 'GRAVE', 'ROVER', 'ROGER', 'RARER', 'GRAVER', 'OVERAGE'
  ];
  it('should solve the board', done => {
    var boggle = new Boggle('eorgvregearjkgoe');
    boggle.solve(words => {
      expect(words).to.eql(ans);
      done();
    });
  });

  it('should solve the board faster because it doesn\'t have to load english again', done => {
    var boggle = new Boggle('eorgvregearjkgoe');
    boggle.solve(words => {
      expect(words).to.eql(ans);
      done();
    });
  });

  it('should have working "contains" method', () => {
    var boggle = new Boggle('eorgvregearjkgoe');
    boggle.contains('are', result => {
      expect(result).to.be.true;
    });
    boggle.contains('oar', result => {
      expect(result).to.be.true;
    });
    boggle.contains('grave', result => {
      expect(result).to.be.true;
    });
    boggle.contains('overage', result => {
      expect(result).to.be.true;
    });
    boggle.contains('a', result => {
      expect(result).to.be.false;
    });
    boggle.contains('ar', result => {
      expect(result).to.be.false;
    });
    boggle.contains('not', result => {
      expect(result).to.be.false;
    });
    boggle.contains('gores', result => {
      expect(result).to.be.false;
    });
    boggle.contains('randomstuff', result => {
      expect(result).to.be.false;
    });
    boggle.contains('roverd', result => {
      expect(result).to.be.false;
    });
    boggle.contains('grake', result => {
      expect(result).to.be.false;
    });
  });

  it('should handle 3x3 board', () => {
    var ans = [
      'AIL', 'AIR', 'EAR', 'ELL', 'ILL', 'LIE', 'LEA', 'LEI', 'OIL', 'OAR', 'VIA', 'VIE', 'EARL',
      'EVIL', 'JELL', 'JIVE', 'LIRA', 'LIAR', 'LIVE', 'RILE', 'RILL', 'RAVE', 'ROIL', 'RAIL',
      'VILE', 'VEIL', 'RAVEL'
    ];
    var boggle = new Boggle('vaoeirjll');
    expect(boggle.board).to.have.length(3);
    expect(boggle.board[0]).to.have.length(3);
    boggle.solve(words => {
      expect(words).to.eql(ans);
      done();
    });
  });

  it('should handle a 8x8 board', () => {
    var ans = [
      'AND', 'ARE', 'APE', 'ASH', 'AGO', 'AGE', 'ANI', 'AIR', 'EGG', 'EAR', 'ERG', 'ERE', 'ERR',
      'END', 'ERA', 'EGO', 'FED', 'FEE', 'FER', 'FIE', 'FIG', 'FIR', 'GEE', 'GIG', 'GOO', 'GIN',
      'GUN', 'GAP', 'GAG', 'GAS', 'GUT', 'HUE', 'HAG', 'HUT', 'HEP', 'HER', 'HUG', 'IRE', 'JOG',
      'JIG', 'JAG', 'JAR', 'JUG', 'KEG', 'NAG', 'NAP', 'NUT', 'OUR', 'ORE', 'OAR', 'PUG', 'PAR',
      'PEP', 'PAP', 'PEA', 'PEE', 'PER', 'PAN', 'PEG', 'PRO', 'RAN', 'RED', 'ROE', 'REF', 'REP',
      'RIG', 'REV', 'RAG', 'RUG', 'RUE', 'RAP', 'SUE', 'SHE', 'SUN', 'SAG', 'TEE', 'TUN', 'TUG',
      'THE', 'UGH', 'VIA', 'VAN', 'VIE', 'AJAR', 'AURA', 'ARIA', 'AGAR', 'AVER', 'AREA', 'AGUE',
      'DEEP', 'DEER', 'DEAR', 'EGGS', 'ERGS', 'EURO', 'ERGO', 'ENDS', 'EARN', 'FEAR', 'FIVE',
      'FIRE', 'GROG', 'GASH', 'GAVE', 'GORE', 'GUSH', 'GOOK', 'GRIN', 'GAIN', 'GUNS', 'GIVE',
      'GOOP', 'GURU', 'GAGS', 'GANG', 'GEAR', 'GAGE', 'GAPE', 'HAIR', 'HAGS', 'HARP', 'HARE',
      'HEAP', 'HANG', 'HEED', 'HERE', 'HEIR', 'HUGS', 'HEAR', 'JAGS', 'JAPE', 'JIVE', 'JOKE',
      'KEEP', 'NAGS', 'NAPE', 'NAVE', 'NEAR', 'OGRE', 'PAIR', 'PEEP', 'PEER', 'PEEK', 'PURR',
      'PANE', 'PERK', 'PEED', 'PARE', 'PREP', 'PAPA', 'PURE', 'POKE', 'POOR', 'POUR', 'PAIN',
      'PORE', 'PORN', 'PANG', 'PEAR', 'RARE', 'RUIN', 'REEF', 'RAGS', 'RAPE', 'RANG', 'RIFE',
      'REND', 'RAJA', 'REAP', 'REED', 'RAGA', 'RAIN', 'RING', 'ROAR', 'REAR', 'ROOK', 'ROPE',
      'ROAN', 'REIN', 'SNUG', 'SHAG', 'SHUT', 'SHUN', 'SAKE', 'SAGE', 'SAGO', 'SNAG', 'SANG',
      'SUET', 'SANE', 'SAVE', 'SAND', 'TUSH', 'TUGS', 'THUS', 'THUG', 'TUNS', 'THEE', 'VANE',
      'VANS', 'VEND', 'VIED', 'AGING', 'AUGER', 'ARENA', 'AREAS', 'AERIE', 'AIRED', 'AGREE',
      'AGAPE', 'AGAIN', 'ARGUE', 'ETHER', 'EAGER', 'ERRED', 'ENSUE', 'EERIE', 'FIVER', 'FIRED',
      'FIEND', 'GANGS', 'GNASH', 'GRAPH', 'GREED', 'GIVEN', 'GROUP', 'GREEN', 'GAUGE', 'GOUGE',
      'GRAIN', 'GREET', 'GRAPE', 'GROPE', 'GROAN', 'HANGS', 'HARED', 'JAPAN', 'JEANS', 'JOKER',
      'JUROR', 'NEIGH', 'ORGAN', 'PAEAN', 'PUREE', 'PEKOE', 'PAPER', 'POKER', 'PARED', 'PREEN',
      'PANGS', 'PURER', 'RENDS', 'RERAN', 'RARED', 'RUING', 'RAJAS', 'ROUGE', 'RIGOR', 'RUPEE',
      'RARER', 'REIGN', 'RIVEN', 'SHEEP', 'SNEAK', 'SNAKE', 'SHEER', 'SANER', 'SHARP', 'SHAPE',
      'SAVER', 'SHARE', 'SHEET', 'SHEAR', 'SAGER', 'THUGS', 'THREE', 'THERE', 'UTTER', 'USAGE',
      'USHER', 'VAGUE', 'VENDS', 'VEGAN', 'ARRIVE', 'APOGEE', 'AGREED', 'ARENAS', 'APPEAR',
      'DERIVE', 'ENVIED', 'ERRING', 'EDGIER', 'ENGAGE', 'EARNER', 'FIENDS', 'GEARED',
      'GORIER', 'GORING', 'GARNER', 'GARRET', 'GOUGER', 'GUTTER', 'GRAPHS', 'GIVENS',
      'GUSHER', 'GUNNER', 'HERNIA', 'HAIRED', 'HEARER', 'HEPPER', 'JAGUAR', 'JARRED',
      'KEEPER', 'NEARED', 'PORING', 'PAIRED', 'PAGING', 'PEEPER', 'PEPPER', 'PANIER',
      'PARING', 'POORER', 'PARRED', 'RARING', 'REPAIR', 'RAPPER', 'REARED', 'REAPER',
      'RAGING', 'REGGAE', 'TEEPEE', 'URGING', 'VAGUER', 'VIRAGO', 'VEGANS', 'ARRAIGN',
      'ARGUING', 'EAGERER', 'EARRING', 'GOUGING', 'GROUPER', 'HARRIED', 'JARRING', 'NEIGHED',
      'PURGING', 'PARRIED', 'POURING', 'PARRING', 'PREPARE', 'ROUGING', 'RANGIER', 'SHUTTER',
      'SNUGGER', 'SHEERER', 'SHEARER', 'SHARPER', 'SNEAKER', 'AGREEING', 'HARANGUE', 'REAPPEAR',
      'REPAIRED', 'AVERAGING', 'GARNERING'
    ];
    var boggle = new Boggle('sdjgneraghpareugnaeporigrpeouganerkgjarpehgaeraetusnviehtvndjfgd');
    expect(boggle.board).to.have.length(8);
    expect(boggle.board[0]).to.have.length(8);
    boggle.solve(words => {
      expect(words).to.eql(ans);
      done();
    });
  });

  it('should not generate a board when incorrect number of letters supplied', () => {
    expect(function() { new Boggle('kgbetuwosanvgfkehgfjawe'); }).to.throw(Error);
  });

  it('should not generate a board when invalid characters supplied', () => {
    expect(function() { new Boggle('kgbetuwosanvgfkehgfjawe'); }).to.throw(Error);
  });
});

describe('random board generator', () => {

  var boggle1, boggle2;
  it('should default to 4x4 without an argument', () => {
    boggle1 = new Boggle();
    expect(boggle1.board).to.have.length(4);
    expect(boggle1.board[0]).to.have.length(4);
  });

  it('should generate a random 4x4 board', () => {
    boggle2 = new Boggle(4);
    expect(boggle2.board).to.have.length(4);
    expect(boggle2.board[0]).to.have.length(4);
    expect(boggle2.board).to.not.eql(boggle1.board);
  });

  it('should generate a random 5x5 board', () => {
    var boggle = new Boggle(5);
    expect(boggle.board).to.have.length(5);
    expect(boggle.board[0]).to.have.length(5);
  });

  it('should generate a random 6x6 board', () => {
    var boggle = new Boggle(6);
    expect(boggle.board).to.have.length(6);
    expect(boggle.board[0]).to.have.length(6);
  });

  it('should not generate a random 7x7 board', () => {
    expect(function() { new Boggle(7); }).to.throw(Error);
  });

  it('should not generate a random 3x3 board', () => {
    expect(function() { new Boggle(3); }).to.throw(Error);
  });

});
