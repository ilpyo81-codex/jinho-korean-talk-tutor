window.TALK_TUTOR_DATA = {
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

  lessons: [
    {
      id: "hello",
      title: { en: "Meet a friend", ko: "친구 만나기" },
      steps: {
        minecraft: [
          {
            tutor: {
              en: "JINHO, you are in a Minecraft village. A villager is standing in front of you.",
              ko: "JINHO, 마인크래프트 마을에 왔어요. 주민이 앞에 서 있어요."
            },
            explain: {
              en: "When you meet someone, you can say this in Korean.",
              ko: "누군가를 만났을 때 한국어로 이렇게 말할 수 있어요."
            },
            expression: "안녕하세요",
            roman: "annyeonghaseyo",
            meaning: { en: "Hello", ko: "안녕하세요" },
            reaction: {
              en: "Great! The villager smiles at JINHO.",
              ko: "좋아요! 주민이 JINHO에게 웃어줬어요."
            }
          },
          {
            tutor: {
              en: "The villager gives JINHO a block.",
              ko: "주민이 JINHO에게 블록을 줬어요."
            },
            explain: {
              en: "When someone gives you something, say this politely.",
              ko: "누군가 무언가를 주면 정중하게 이렇게 말해요."
            },
            expression: "감사합니다",
            roman: "gamsahamnida",
            meaning: { en: "Thank you", ko: "감사합니다" },
            reaction: {
              en: "Nice! JINHO used a polite Korean word.",
              ko: "좋아요! JINHO가 정중한 한국어를 사용했어요."
            }
          }
        ],
        roblox: [
          {
            tutor: {
              en: "JINHO enters a Roblox obby. A friendly avatar waves at him.",
              ko: "JINHO가 로블록스 오비에 들어갔어요. 친절한 아바타가 손을 흔들어요."
            },
            explain: {
              en: "When you meet a new friend, say this.",
              ko: "새 친구를 만났을 때 이렇게 말해요."
            },
            expression: "안녕하세요",
            roman: "annyeonghaseyo",
            meaning: { en: "Hello", ko: "안녕하세요" },
            reaction: {
              en: "Great! The avatar wants to play with JINHO.",
              ko: "좋아요! 아바타가 JINHO와 같이 놀고 싶어해요."
            }
          },
          {
            tutor: {
              en: "The avatar gives JINHO a star.",
              ko: "아바타가 JINHO에게 별을 줬어요."
            },
            explain: {
              en: "Now JINHO can say thank you in Korean.",
              ko: "이제 JINHO가 한국어로 고맙다고 말할 수 있어요."
            },
            expression: "감사합니다",
            roman: "gamsahamnida",
            meaning: { en: "Thank you", ko: "감사합니다" },
            reaction: {
              en: "Good job! The avatar is happy.",
              ko: "잘했어요! 아바타가 기뻐해요."
            }
          }
        ],
        pokemon: [
          {
            tutor: {
              en: "JINHO meets Pikachu on a small road.",
              ko: "JINHO가 작은 길에서 피카츄를 만났어요."
            },
            explain: {
              en: "When you meet Pikachu, say hello in Korean.",
              ko: "피카츄를 만나면 한국어로 인사해요."
            },
            expression: "안녕하세요",
            roman: "annyeonghaseyo",
            meaning: { en: "Hello", ko: "안녕하세요" },
            reaction: {
              en: "Pikachu says pika pika!",
              ko: "피카츄가 피카피카라고 말해요!"
            }
          },
          {
            tutor: {
              en: "Pikachu shares a berry with JINHO.",
              ko: "피카츄가 JINHO에게 열매를 나눠줬어요."
            },
            explain: {
              en: "When someone shares something, say this.",
              ko: "누군가 나눠주면 이렇게 말해요."
            },
            expression: "감사합니다",
            roman: "gamsahamnida",
            meaning: { en: "Thank you", ko: "감사합니다" },
            reaction: {
              en: "Great! Pikachu smiles.",
              ko: "좋아요! 피카츄가 웃어요."
            }
          }
        ],
        mario: [
          {
            tutor: {
              en: "JINHO meets Mario near a green pipe.",
              ko: "JINHO가 초록 파이프 근처에서 마리오를 만났어요."
            },
            explain: {
              en: "Before the adventure starts, say hello in Korean.",
              ko: "모험을 시작하기 전에 한국어로 인사해요."
            },
            expression: "안녕하세요",
            roman: "annyeonghaseyo",
            meaning: { en: "Hello", ko: "안녕하세요" },
            reaction: {
              en: "Mario says, let’s go!",
              ko: "마리오가 같이 가자고 해요!"
            }
          },
          {
            tutor: {
              en: "Mario gives JINHO a coin.",
              ko: "마리오가 JINHO에게 코인을 줬어요."
            },
            explain: {
              en: "When someone gives you something, say thank you.",
              ko: "누군가 무언가를 주면 감사하다고 말해요."
            },
            expression: "감사합니다",
            roman: "gamsahamnida",
            meaning: { en: "Thank you", ko: "감사합니다" },
            reaction: {
              en: "Great! JINHO is polite.",
              ko: "좋아요! JINHO가 예의 바르게 말했어요."
            }
          }
        ]
      }
    },
    {
      id: "drink",
      title: { en: "Ask for a drink", ko: "마실 것 부탁하기" },
      steps: {
        minecraft: [
          {
            tutor: {
              en: "JINHO and Steve finish building a small house.",
              ko: "JINHO와 Steve가 작은 집을 완성했어요."
            },
            explain: {
              en: "JINHO is thirsty. He can ask for water in Korean.",
              ko: "JINHO가 목이 말라요. 한국어로 물을 부탁할 수 있어요."
            },
            expression: "물 주세요",
            roman: "mul juseyo",
            meaning: { en: "Water, please", ko: "물 주세요" },
            reaction: {
              en: "Good! Steve brings water.",
              ko: "좋아요! Steve가 물을 가져왔어요."
            }
          },
          {
            tutor: {
              en: "Now JINHO wants juice after playing.",
              ko: "이제 JINHO가 놀고 나서 주스를 마시고 싶어요."
            },
            explain: {
              en: "He can ask politely like this.",
              ko: "정중하게 이렇게 부탁할 수 있어요."
            },
            expression: "주스 주세요",
            roman: "juseu juseyo",
            meaning: { en: "Juice, please", ko: "주스 주세요" },
            reaction: {
              en: "Nice! JINHO asked politely.",
              ko: "좋아요! JINHO가 정중하게 부탁했어요."
            }
          }
        ],
        roblox: [
          {
            tutor: {
              en: "JINHO finishes a Roblox obby jump.",
              ko: "JINHO가 로블록스 오비 점프를 성공했어요."
            },
            explain: {
              en: "After jumping, JINHO can ask for water.",
              ko: "점프한 뒤 JINHO가 물을 부탁할 수 있어요."
            },
            expression: "물 주세요",
            roman: "mul juseyo",
            meaning: { en: "Water, please", ko: "물 주세요" },
            reaction: {
              en: "Great! JINHO gets water at the checkpoint.",
              ko: "좋아요! JINHO가 체크포인트에서 물을 받았어요."
            }
          },
          {
            tutor: {
              en: "At the checkpoint cafe, JINHO wants juice.",
              ko: "체크포인트 카페에서 JINHO가 주스를 원해요."
            },
            explain: {
              en: "Say this Korean sentence.",
              ko: "이 한국어 문장을 말해요."
            },
            expression: "주스 주세요",
            roman: "juseu juseyo",
            meaning: { en: "Juice, please", ko: "주스 주세요" },
            reaction: {
              en: "Good job! The juice is ready.",
              ko: "잘했어요! 주스가 준비됐어요."
            }
          }
        ],
        pokemon: [
          {
            tutor: {
              en: "JINHO and Pikachu played outside.",
              ko: "JINHO와 피카츄가 밖에서 놀았어요."
            },
            explain: {
              en: "Pikachu is thirsty. JINHO can ask for water.",
              ko: "피카츄가 목이 말라요. JINHO가 물을 부탁할 수 있어요."
            },
            expression: "물 주세요",
            roman: "mul juseyo",
            meaning: { en: "Water, please", ko: "물 주세요" },
            reaction: {
              en: "Great! Pikachu drinks water.",
              ko: "좋아요! 피카츄가 물을 마셔요."
            }
          },
          {
            tutor: {
              en: "After walking to the next town, JINHO wants juice.",
              ko: "다음 마을까지 걸어간 뒤 JINHO가 주스를 원해요."
            },
            explain: {
              en: "Ask in Korean like this.",
              ko: "한국어로 이렇게 부탁해요."
            },
            expression: "주스 주세요",
            roman: "juseu juseyo",
            meaning: { en: "Juice, please", ko: "주스 주세요" },
            reaction: {
              en: "Nice! JINHO got juice.",
              ko: "좋아요! JINHO가 주스를 받았어요."
            }
          }
        ],
        mario: [
          {
            tutor: {
              en: "JINHO and Mario run across the grass land.",
              ko: "JINHO와 마리오가 초원을 달렸어요."
            },
            explain: {
              en: "JINHO is thirsty. He can ask for water.",
              ko: "JINHO가 목이 말라요. 물을 부탁할 수 있어요."
            },
            expression: "물 주세요",
            roman: "mul juseyo",
            meaning: { en: "Water, please", ko: "물 주세요" },
            reaction: {
              en: "Mario brings water. Great!",
              ko: "마리오가 물을 가져왔어요. 좋아요!"
            }
          },
          {
            tutor: {
              en: "After collecting coins, JINHO wants juice.",
              ko: "코인을 모은 뒤 JINHO가 주스를 원해요."
            },
            explain: {
              en: "Say this Korean sentence.",
              ko: "이 한국어 문장을 말해요."
            },
            expression: "주스 주세요",
            roman: "juseu juseyo",
            meaning: { en: "Juice, please", ko: "주스 주세요" },
            reaction: {
              en: "Great! JINHO asked nicely.",
              ko: "좋아요! JINHO가 예쁘게 부탁했어요."
            }
          }
        ]
      }
    },
    {
      id: "help",
      title: { en: "Ask for help", ko: "도움 요청하기" },
      steps: {
        minecraft: [
          {
            tutor: {
              en: "JINHO enters a dark Minecraft cave.",
              ko: "JINHO가 어두운 마인크래프트 동굴에 들어갔어요."
            },
            explain: {
              en: "When he needs help, he can say this.",
              ko: "도움이 필요할 때 이렇게 말할 수 있어요."
            },
            expression: "도와주세요",
            roman: "dowajuseyo",
            meaning: { en: "Please help me", ko: "도와주세요" },
            reaction: {
              en: "Steve hears JINHO and comes to help.",
              ko: "Steve가 JINHO의 말을 듣고 도와주러 왔어요."
            }
          },
          {
            tutor: {
              en: "Steve points to a path, but JINHO wants to know the exact place.",
              ko: "Steve가 길을 가리켰지만 JINHO는 정확한 장소를 알고 싶어요."
            },
            explain: {
              en: "He can ask, where is it?",
              ko: "어디인지 이렇게 물을 수 있어요."
            },
            expression: "어디예요?",
            roman: "eodiyeyo?",
            meaning: { en: "Where is it?", ko: "어디예요?" },
            reaction: {
              en: "Good! Now JINHO can find the path.",
              ko: "좋아요! 이제 JINHO가 길을 찾을 수 있어요."
            }
          }
        ],
        roblox: [
          {
            tutor: {
              en: "JINHO cannot find the next Roblox checkpoint.",
              ko: "JINHO가 다음 로블록스 체크포인트를 못 찾았어요."
            },
            explain: {
              en: "When he needs help, say this.",
              ko: "도움이 필요하면 이렇게 말해요."
            },
            expression: "도와주세요",
            roman: "dowajuseyo",
            meaning: { en: "Please help me", ko: "도와주세요" },
            reaction: {
              en: "An NPC comes to help JINHO.",
              ko: "NPC가 JINHO를 도와주러 왔어요."
            }
          },
          {
            tutor: {
              en: "The NPC says the checkpoint is nearby.",
              ko: "NPC가 체크포인트가 근처에 있다고 말해요."
            },
            explain: {
              en: "JINHO can ask where it is.",
              ko: "JINHO가 어디인지 물을 수 있어요."
            },
            expression: "어디예요?",
            roman: "eodiyeyo?",
            meaning: { en: "Where is it?", ko: "어디예요?" },
            reaction: {
              en: "Great! JINHO finds the checkpoint.",
              ko: "좋아요! JINHO가 체크포인트를 찾았어요."
            }
          }
        ],
        pokemon: [
          {
            tutor: {
              en: "JINHO and Pikachu cannot find the road.",
              ko: "JINHO와 피카츄가 길을 못 찾았어요."
            },
            explain: {
              en: "JINHO can ask for help in Korean.",
              ko: "JINHO가 한국어로 도움을 요청할 수 있어요."
            },
            expression: "도와주세요",
            roman: "dowajuseyo",
            meaning: { en: "Please help me", ko: "도와주세요" },
            reaction: {
              en: "A trainer comes and helps them.",
              ko: "트레이너가 와서 도와줬어요."
            }
          },
          {
            tutor: {
              en: "The trainer points to the Pokémon gym.",
              ko: "트레이너가 포켓몬 체육관을 가리켰어요."
            },
            explain: {
              en: "JINHO can ask where it is.",
              ko: "JINHO가 어디인지 물을 수 있어요."
            },
            expression: "어디예요?",
            roman: "eodiyeyo?",
            meaning: { en: "Where is it?", ko: "어디예요?" },
            reaction: {
              en: "Good! Pikachu follows JINHO.",
              ko: "좋아요! 피카츄가 JINHO를 따라가요."
            }
          }
        ],
        mario: [
          {
            tutor: {
              en: "JINHO cannot find the right pipe.",
              ko: "JINHO가 맞는 파이프를 찾지 못했어요."
            },
            explain: {
              en: "When he needs help, he can say this.",
              ko: "도움이 필요할 때 이렇게 말할 수 있어요."
            },
            expression: "도와주세요",
            roman: "dowajuseyo",
            meaning: { en: "Please help me", ko: "도와주세요" },
            reaction: {
              en: "Mario comes to help JINHO.",
              ko: "마리오가 JINHO를 도와주러 왔어요."
            }
          },
          {
            tutor: {
              en: "Mario points at a castle.",
              ko: "마리오가 성을 가리켰어요."
            },
            explain: {
              en: "JINHO can ask, where is it?",
              ko: "JINHO가 어디인지 물을 수 있어요."
            },
            expression: "어디예요?",
            roman: "eodiyeyo?",
            meaning: { en: "Where is it?", ko: "어디예요?" },
            reaction: {
              en: "Great! JINHO knows where to go.",
              ko: "좋아요! JINHO가 어디로 가야 하는지 알게 됐어요."
            }
          }
        ]
      }
    }
  ]
};
