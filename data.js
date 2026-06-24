window.KTUTOR_DATA = {
  themes: {
    minecraft: {
      icon: "⛏️",
      en: "Minecraft",
      ko: "마인크래프트",
      chars: ["👦", "🧑‍🌾", "🧱"],
      items: ["🧱 Block", "⛏️ Pickaxe", "🏠 House", "💧 Water"]
    },
    roblox: {
      icon: "🕹️",
      en: "Roblox",
      ko: "로블록스",
      chars: ["🧑‍🚀", "🤖", "🧩"],
      items: ["🧩 Obby", "⭐ Star", "🪙 Coin", "🧃 Juice"]
    },
    pokemon: {
      icon: "⚡",
      en: "Pokémon",
      ko: "포켓몬",
      chars: ["👦", "🐭", "🔴"],
      items: ["🔴 Poké Ball", "⚡ Thunder", "🏅 Badge", "🥛 Milk"]
    },
    mario: {
      icon: "🍄",
      en: "Super Mario",
      ko: "슈퍼마리오",
      chars: ["👦", "👨🏻‍🔧", "🍄"],
      items: ["🍄 Mushroom", "⭐ Star", "🪙 Coin", "🏰 Castle"]
    }
  },

  curriculum: [
    {
      id: "greet",
      title: { en: "Hello Friends", ko: "친구에게 인사하기" },
      goal: { en: "Say hello and thank you politely", ko: "인사와 감사 표현 말하기" },
      items: [
        {
          korean: "안녕하세요",
          roman: "annyeonghaseyo",
          en: "Hello",
          checks: ["안녕하세요"],
          hint: { en: "A polite hello.", ko: "정중한 인사예요." }
        },
        {
          korean: "감사합니다",
          roman: "gamsahamnida",
          en: "Thank you",
          checks: ["감사합니다"],
          hint: { en: "A polite thank you.", ko: "정중하게 고마움을 말해요." }
        },
        {
          korean: "괜찮습니다",
          roman: "gwaenchanseumnida",
          en: "It is okay",
          checks: ["괜찮습니다"],
          hint: { en: "A polite way to say you are okay.", ko: "괜찮다고 정중하게 말해요." }
        }
      ]
    },
    {
      id: "drink",
      title: { en: "Ask for a Drink", ko: "마실 것 부탁하기" },
      goal: { en: "Ask for water, juice, or milk", ko: "물, 주스, 우유 부탁하기" },
      items: [
        {
          korean: "물 주세요",
          roman: "mul juseyo",
          en: "Water, please",
          checks: ["물 주세요"],
          hint: { en: "Short and useful.", ko: "짧고 쉬운 표현이에요." }
        },
        {
          korean: "주스 주세요",
          roman: "juseu juseyo",
          en: "Juice, please",
          checks: ["주스 주세요"],
          hint: { en: "Use this when you want juice.", ko: "주스를 원할 때 써요." }
        },
        {
          korean: "우유 주세요",
          roman: "uyu juseyo",
          en: "Milk, please",
          checks: ["우유 주세요"],
          hint: { en: "Use this when you want milk.", ko: "우유를 원할 때 써요." }
        }
      ]
    },
    {
      id: "help",
      title: { en: "Ask for Help", ko: "도움 요청하기" },
      goal: { en: "Use short help sentences", ko: "짧은 도움 표현 말하기" },
      items: [
        {
          korean: "도와주세요",
          roman: "dowajuseyo",
          en: "Please help me",
          checks: ["도와주세요"],
          hint: { en: "Say this when you need help.", ko: "도움이 필요할 때 써요." }
        },
        {
          korean: "어디예요?",
          roman: "eodiyeyo?",
          en: "Where is it?",
          checks: ["어디예요", "어디예요?"],
          hint: { en: "Ask where something is.", ko: "어디인지 물어요." }
        },
        {
          korean: "다시 해보겠습니다",
          roman: "dasi haebogetseumnida",
          en: "I will try again",
          checks: ["다시 해보겠습니다"],
          hint: { en: "A polite way to say you will try again.", ko: "다시 하겠다고 정중히 말해요." }
        }
      ]
    }
  ],

  stories: {
    minecraft: {
      greet: [
        {
          en: "JINHO arrives at a Minecraft village. A Villager is at the gate. First, JINHO says hello.",
          ko: "JINHO가 마인크래프트 마을에 도착했어요. 주민이 문 앞에 있어요. 먼저 인사해요."
        },
        {
          en: "The Villager gives JINHO a little block. JINHO says thank you politely.",
          ko: "주민이 JINHO에게 작은 블록을 줬어요. JINHO가 정중하게 고맙다고 말해요."
        },
        {
          en: "A tiny slime bumps into JINHO. JINHO is okay, so he says he is fine.",
          ko: "작은 슬라임이 JINHO에게 살짝 부딪혔어요. JINHO는 괜찮아서 괜찮다고 말해요."
        }
      ],
      drink: [
        {
          en: "JINHO and Steve finish building a small house. Steve is thirsty. JINHO asks for water.",
          ko: "JINHO와 Steve가 작은 집을 완성했어요. Steve가 목이 말라요. JINHO가 물을 부탁해요."
        },
        {
          en: "After drinking water, Steve wants to share a treat. JINHO asks for juice.",
          ko: "물을 마신 뒤 Steve가 간식을 나누고 싶어해요. JINHO가 주스를 부탁해요."
        },
        {
          en: "Before bedtime in the Minecraft house, JINHO asks for milk.",
          ko: "마인크래프트 집에서 잠자기 전, JINHO가 우유를 부탁해요."
        }
      ],
      help: [
        {
          en: "JINHO enters a dark cave. He cannot see the path, so he asks for help.",
          ko: "JINHO가 어두운 동굴에 들어갔어요. 길이 잘 안 보여서 도움을 요청해요."
        },
        {
          en: "Steve points somewhere, but JINHO wants to know the exact place. He asks where it is.",
          ko: "Steve가 어딘가를 가리켰어요. JINHO는 정확한 장소를 알고 싶어서 어디인지 물어요."
        },
        {
          en: "JINHO misses a jump. That is okay. He says he will try again.",
          ko: "JINHO가 점프를 놓쳤어요. 괜찮아요. 다시 해보겠다고 말해요."
        }
      ]
    },

    roblox: {
      greet: [
        {
          en: "JINHO joins a Roblox server. A friendly avatar waves. JINHO says hello.",
          ko: "JINHO가 로블록스 서버에 들어왔어요. 친절한 아바타가 손을 흔들어요. JINHO가 인사해요."
        },
        {
          en: "The avatar gives JINHO a star. JINHO says thank you politely.",
          ko: "아바타가 JINHO에게 별을 줬어요. JINHO가 정중하게 고맙다고 말해요."
        },
        {
          en: "JINHO falls softly on a cushion block. He is okay, so he says he is fine.",
          ko: "JINHO가 쿠션 블록 위에 살짝 떨어졌어요. 괜찮아서 괜찮다고 말해요."
        }
      ],
      drink: [
        {
          en: "JINHO finishes a Roblox obby jump. His avatar is thirsty. He asks for water.",
          ko: "JINHO가 로블록스 오비 점프를 성공했어요. 아바타가 목이 말라요. 물을 부탁해요."
        },
        {
          en: "At the checkpoint cafe, JINHO asks for juice.",
          ko: "체크포인트 카페에서 JINHO가 주스를 부탁해요."
        },
        {
          en: "Before the next stage, JINHO asks for milk to get strong.",
          ko: "다음 스테이지 전에 JINHO가 힘을 내려고 우유를 부탁해요."
        }
      ],
      help: [
        {
          en: "JINHO cannot find the next checkpoint. He asks for help.",
          ko: "JINHO가 다음 체크포인트를 못 찾았어요. 도움을 요청해요."
        },
        {
          en: "An NPC says the checkpoint is nearby. JINHO asks, where is it?",
          ko: "NPC가 체크포인트가 근처에 있다고 해요. JINHO가 어디인지 물어요."
        },
        {
          en: "JINHO misses the jump once. He says he will try again.",
          ko: "JINHO가 점프를 한 번 실패했어요. 다시 해보겠다고 말해요."
        }
      ]
    },

    pokemon: {
      greet: [
        {
          en: "JINHO meets Pikachu on the road. He says hello gently.",
          ko: "JINHO가 길에서 피카츄를 만났어요. 부드럽게 인사해요."
        },
        {
          en: "Pikachu shares a berry. JINHO says thank you politely.",
          ko: "피카츄가 열매를 나눠줬어요. JINHO가 정중하게 고맙다고 말해요."
        },
        {
          en: "Pikachu worries about JINHO. JINHO is okay, so he says he is fine.",
          ko: "피카츄가 JINHO를 걱정해요. JINHO는 괜찮아서 괜찮다고 말해요."
        }
      ],
      drink: [
        {
          en: "JINHO and Pikachu played outside. Pikachu is thirsty. JINHO asks for water.",
          ko: "JINHO와 피카츄가 밖에서 놀았어요. 피카츄가 목이 말라요. JINHO가 물을 부탁해요."
        },
        {
          en: "After walking to the next town, JINHO asks for juice.",
          ko: "다음 마을까지 걸어간 뒤, JINHO가 주스를 부탁해요."
        },
        {
          en: "Before the Pokémon gym, JINHO asks for milk.",
          ko: "포켓몬 체육관에 가기 전, JINHO가 우유를 부탁해요."
        }
      ],
      help: [
        {
          en: "JINHO and Pikachu cannot find the road. JINHO asks for help.",
          ko: "JINHO와 피카츄가 길을 못 찾았어요. JINHO가 도움을 요청해요."
        },
        {
          en: "A trainer points to a road. JINHO asks where it is.",
          ko: "트레이너가 길을 가리켰어요. JINHO가 어디인지 물어요."
        },
        {
          en: "JINHO tries a gym challenge and misses once. He says he will try again.",
          ko: "JINHO가 체육관 도전을 하다가 한 번 실패했어요. 다시 해보겠다고 말해요."
        }
      ]
    },

    mario: {
      greet: [
        {
          en: "JINHO meets Mario near a pipe. JINHO says hello before the adventure starts.",
          ko: "JINHO가 파이프 근처에서 마리오를 만났어요. 모험을 시작하기 전에 인사해요."
        },
        {
          en: "Mario gives JINHO a coin. JINHO says thank you politely.",
          ko: "마리오가 JINHO에게 코인을 줬어요. JINHO가 정중하게 고맙다고 말해요."
        },
        {
          en: "JINHO bumps a soft block. He is okay, so he says he is fine.",
          ko: "JINHO가 부드러운 블록에 살짝 부딪혔어요. 괜찮아서 괜찮다고 말해요."
        }
      ],
      drink: [
        {
          en: "JINHO and Mario run across the grass land. JINHO asks for water.",
          ko: "JINHO와 마리오가 초원을 달렸어요. JINHO가 물을 부탁해요."
        },
        {
          en: "After collecting coins, JINHO asks for juice.",
          ko: "코인을 모은 뒤 JINHO가 주스를 부탁해요."
        },
        {
          en: "Before going to the castle, JINHO asks for milk.",
          ko: "성으로 가기 전 JINHO가 우유를 부탁해요."
        }
      ],
      help: [
        {
          en: "JINHO cannot find the right pipe. He asks for help.",
          ko: "JINHO가 맞는 파이프를 못 찾았어요. 도움을 요청해요."
        },
        {
          en: "Mario points at a castle. JINHO asks where it is.",
          ko: "마리오가 성을 가리켰어요. JINHO가 어디인지 물어요."
        },
        {
          en: "JINHO misses a jump. He says he will try again.",
          ko: "JINHO가 점프를 실패했어요. 다시 해보겠다고 말해요."
        }
      ]
    }
  }
};
