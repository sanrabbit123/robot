module.exports = {
  "main": {
    "navigator": {
      "menu": [
        {
          "name": "서비스 소개",
          "href": "/about.php"
        },
        {
          "name": "포트폴리오",
          "href": "/portfolio.php"
        },
        {
          "name": "디자이너",
          "href": "/designer.php"
        },
        {
          "name": "고객 후기",
          "href": "/review.php"
        },
        {
          "name": "서비스 신청",
          "href": "/consulting.php"
        }
      ],
      "logo": {
        "name": "type01",
        "color": "#2fa678"
      },
      "src": {
        "logo": "g_logos_navi_7rspot679_100222.svg",
        "words": {
          "desktop": [
            {
              "gray": "g_ngray_navi0_4rspot174_100222.svg",
              "green": "g_ngreen_navi0_4rspot174_100222.svg"
            },
            {
              "gray": "g_ngray_navi1_3rspot99_100222.svg",
              "green": "g_ngreen_navi1_3rspot99_100222.svg"
            },
            {
              "gray": "g_ngray_navi2_3rspot134_100222.svg",
              "green": "g_ngreen_navi2_3rspot134_100222.svg"
            },
            {
              "gray": "g_ngray_navi3_3rspot393_100222.svg",
              "green": "g_ngreen_navi3_3rspot393_100222.svg"
            },
            {
              "gray": "g_ngray_navi4_4rspot161_100222.svg",
              "green": "g_ngreen_navi4_4rspot161_100222.svg"
            }
          ],
          "mobile": [
            {
              "group": "g_monavi_1rspot038_100222.svg"
            }
          ]
        },
        "icons": {
          "search": "g_isearch_0rspot945_100222.svg",
          "hamburger": "g_ihamburger_1rspot567_100222.svg"
        }
      }
    },
    "footer": {
      "words": {
        "business": [
          {
            "name": [
              "CEO : 박혜연",
              "서울특별시 성동구 성수이로22길 37, 4층 408C",
              "사업자등록번호 : 221 - 81 - 49759",
              "통신판매신고업 : 제 2020 - 서울성동 - 01563호"
            ],
            "action": {
              "css": "f18home",
              "js": "window.location.href = 'https://home-liaison.com';"
            }
          }
        ],
        "generalInfo": [
          {
            "name": [
              "T : 02-2039-2252",
              "E : help@home-liaison.com"
            ],
            "action": {
              "css": "",
              "js": ""
            }
          }
        ],
        "support": [
          {
            "name": [
              "계약금 결제",
              "잔금 결제"
            ],
            "action": [
              {
                "css": "f18faq",
                "js": "window.location.href = 'https://home-liaison.com/payment.php?card=true';"
              },
              {
                "css": "f18card",
                "js": "window.location.href = 'https://home-liaison.com/payment.php?card=true&type=left';"
              }
            ]
          },
          {
            "name": "이용약관 & 개인정보 이용방침",
            "action": {
              "css": "f18terms",
              "js": "window.location.href = 'https://home-liaison.com/payment.php?type=terms&qqq=terms';"
            }
          }
        ],
        "menu": [
          {
            "name": "서비스 소개",
            "action": {
              "css": "f18about",
              "js": "window.location.href = 'https://home-liaison.com/about.php';"
            }
          },
          {
            "name": "포트폴리오",
            "action": {
              "css": "f18port",
              "js": "window.location.href = 'https://home-liaison.com/portfolio.php';"
            }
          },
          {
            "name": "디자이너",
            "action": {
              "css": "f18designer",
              "js": "window.location.href = 'https://home-liaison.com/designer.php';"
            }
          },
          {
            "name": "고객 후기",
            "action": {
              "css": "f18blog",
              "js": "window.location.href = 'https://home-liaison.com/review.php';"
            }
          }
        ],
        "sns": [
          {
            "name": "현장 / 선호 사진 전송",
            "action": {
              "css": "f18channel",
              "js": "instance.whiteLogin('desktop');"
            }
          },
          {
            "name": [
              "블로그",
              "인스타그램"
            ],
            "action": [
              {
                "css": "f18naverblog",
                "js": "window.location.href = 'https://blog.naver.com/homeliaison';"
              },
              {
                "css": "f18instagram",
                "js": "window.location.href = 'https://www.instagram.com/homeliaison';"
              }
            ]
          },
          {
            "name": "디자이너 신청",
            "action": {
              "css": "f18designersubmit",
              "js": "window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSceV-1hP44vmNJas3zBiKQqISkLHs8916AdsDSxlj2yYytQwg/viewform';"
            }
          }
        ],
        "notice": [
          {
            "name": [
              "홈리에종의 모든 거래에 대한 책임과",
              "배송, 교환, 환불, 민원 등의 처리는",
              "홈리에종에서 진행합니다."
            ],
            "action": {
              "css": "",
              "js": ""
            }
          }
        ],
        "mobileCase": {
          "A": {
            "targets": [
              "About",
              "Revdetail",
              "Portdetail",
              "Payment",
              "Notfound",
              "Event",
              "Designer",
              "Consulting"
            ],
            "menu": [
              {
                "name": "포트폴리오",
                "href": "/portfolio.php"
              },
              {
                "name": "고객 후기",
                "href": "/review.php"
              },
              {
                "name": "사진 전송",
                "href": "/login.php"
              }
            ]
          },
          "B": {
            "targets": [
              "Portfolio",
              "Desdetail"
            ],
            "menu": [
              {
                "name": "디자이너",
                "href": "/designer.php"
              },
              {
                "name": "고객 후기",
                "href": "/review.php"
              },
              {
                "name": "서비스 신청",
                "href": "/consulting.php"
              }
            ]
          },
          "C": {
            "targets": [
              "Review"
            ],
            "menu": [
              {
                "name": "포트폴리오",
                "href": "/portfolio.php"
              },
              {
                "name": "디자이너",
                "href": "/designer.php"
              },
              {
                "name": "서비스 신청",
                "href": "/consulting.php"
              }
            ]
          },
          "D": {
            "targets": [
              "Index"
            ],
            "menu": [
              {
                "name": "계약금 결제",
                "href": "/payment.php?card=true"
              },
              {
                "name": "잔금 결제",
                "href": "/payment.php?card=true&type=left"
              },
              {
                "name": "사진 전송",
                "href": "/login.php"
              }
            ]
          }
        }
      },
      "logo": {
        "name": "type12",
        "color": "#ffffff"
      },
      "src": {
        "logo": "g_logos_foot_3rspot437_100222.svg",
        "desktop": {
          "left": "g_footer_left_1rspot382_100222.svg",
          "right": "g_footer_right_3rspot457_100222.svg"
        },
        "mobile": {
          "A": "g_footer_up_A_3rspot67_100222.svg",
          "B": "g_footer_up_B_3rspot67_100222.svg",
          "C": "g_footer_up_C_3rspot67_100222.svg",
          "D": "g_footer_up_D_3rspot67_100222.svg",
          "Z": "g_footer_down_0rspot987_100222.svg"
        }
      }
    },
    "interaction": {
      "about": {
        "behaviors": [
          {
            "wording": {
              "desktop": "서비스에 대한 자세한 설명을 확인해보세요!",
              "mobile": "상세한 서비스 설명을 확인해보세요!"
            },
            "action": "window.location.href = '/about.php?popup=true';",
            "src": {
              "desktop": "g_interaction_about_behaviors_desktop_0_17rspot84_100222.svg",
              "mobile": "g_interaction_about_behaviors_mobile_0_14rspot822_100222.svg"
            }
          },
          {
            "wording": {
              "desktop": "홈리에종의 솔직한 고객 후기를 확인해보세요!",
              "mobile": "솔직한 고객 후기를 확인해보세요!"
            },
            "action": "window.location.href = '/review.php';",
            "src": {
              "desktop": "g_interaction_about_behaviors_desktop_1_18rspot674_100222.svg",
              "mobile": "g_interaction_about_behaviors_mobile_1_13rspot879_100222.svg"
            }
          }
        ]
      },
      "consulting": {
        "behaviors": [
          {
            "wording": {
              "desktop": "신청서를 남겨주신 적이 있으신가요?",
              "mobile": "신청서를 남겨주신 적이 있으신가요?"
            },
            "action": "instance.mother.constructor.toPhotoUpload(valuesTong);",
            "actionException": [
              {
                "wording": {
                  "desktop": "성함을 알려주세요!",
                  "mobile": "성함을 알려주세요!"
                },
                "src": {
                  "desktop": "g_actionException_consulting_behaviors_desktop_0_0_9rspot351_100222.svg",
                  "mobile": "g_actionException_consulting_behaviors_mobile_0_0_9rspot351_100222.svg"
                }
              },
              {
                "wording": {
                  "desktop": "남겨주신 연락처를 알려주세요!",
                  "mobile": "남겨주신 연락처를 알려주세요!"
                },
                "src": {
                  "desktop": "g_actionException_consulting_behaviors_desktop_0_1_14rspot293_100222.svg",
                  "mobile": "g_actionException_consulting_behaviors_mobile_0_1_14rspot293_100222.svg"
                }
              }
            ],
            "src": {
              "desktop": "g_interaction_consulting_behaviors_desktop_0_14rspot871_100222.svg",
              "mobile": "g_interaction_consulting_behaviors_mobile_0_14rspot871_100222.svg"
            }
          }
        ]
      },
      "desdetail": {
        "behaviors": [
          {
            "wording": {
              "desktop": "이 디자이너와 1:1 상담을 받고 싶다면?",
              "mobile": "이 디자이너와 1:1 상담을 받고 싶다면?"
            },
            "action": "window.location.href = '/consulting.php';",
            "src": {
              "desktop": "g_interaction_desdetail_behaviors_desktop_0_15rspot698_100222.svg",
              "mobile": "g_interaction_desdetail_behaviors_mobile_0_15rspot698_100222.svg"
            }
          }
        ]
      },
      "designer": {
        "behaviors": [
          {
            "wording": {
              "desktop": "디자이너의 포트폴리오를 확인해보세요!",
              "mobile": "디자이너의 포트폴리오를 확인해보세요!"
            },
            "action": "window.location.href = '/portfolio.php';",
            "src": {
              "desktop": "g_interaction_designer_behaviors_desktop_0_16rspot323_100222.svg",
              "mobile": "g_interaction_designer_behaviors_mobile_0_16rspot323_100222.svg"
            }
          },
          {
            "wording": {
              "desktop": "찾으시는 디자이너가 있으신가요?",
              "mobile": "찾으시는 디자이너가 있으신가요?"
            },
            "action": "var query = instance.mother.constructor.objectToQuery({ collection:\"deslist\",columns:[\"desid\"],where:[[[ \"name\", valuesTong[0] ]]],limit:[1]});instance.mother.constructor.ajax(query,\"/engine/ContentsLoop.php\",function (data) { var result = JSON.parse(data); if (result.length > 0) { window.location.href = \"/desdetail.php?qqq=\" + result[0].desid; } else { window.location.href = \"/designer.php\"; } });",
            "actionException": [
              {
                "wording": {
                  "desktop": "디자이너의 이름을 입력해주세요!",
                  "mobile": "디자이너의 이름을 입력해주세요!"
                },
                "src": {
                  "desktop": "g_actionException_designer_behaviors_desktop_1_0_15rspot082_100222.svg",
                  "mobile": "g_actionException_designer_behaviors_mobile_1_0_15rspot082_100222.svg"
                }
              }
            ],
            "src": {
              "desktop": "g_interaction_designer_behaviors_desktop_1_13rspot718_100222.svg",
              "mobile": "g_interaction_designer_behaviors_mobile_1_13rspot718_100222.svg"
            }
          }
        ]
      },
      "event": {
        "behaviors": [
          {
            "wording": {
              "desktop": "서비스에 대한 자세한 설명을 확인해보세요!",
              "mobile": "상세한 서비스 설명을 확인해보세요!"
            },
            "action": "window.location.href = '/about.php?popup=true';",
            "src": {
              "desktop": "g_interaction_event_behaviors_desktop_0_17rspot84_100222.svg",
              "mobile": "g_interaction_event_behaviors_mobile_0_14rspot822_100222.svg"
            }
          },
          {
            "wording": {
              "desktop": "홈리에종의 솔직한 고객 후기를 확인해보세요!",
              "mobile": "솔직한 고객 후기를 확인해보세요!"
            },
            "action": "window.location.href = '/review.php';",
            "src": {
              "desktop": "g_interaction_event_behaviors_desktop_1_18rspot674_100222.svg",
              "mobile": "g_interaction_event_behaviors_mobile_1_13rspot879_100222.svg"
            }
          }
        ]
      },
      "index": {
        "behaviors": [
          {
            "wording": {
              "desktop": "디자이너의 포트폴리오를 확인해보세요!",
              "mobile": "디자이너의 포트폴리오를 확인해보세요!"
            },
            "action": "window.location.href = '/portfolio.php';",
            "src": {
              "desktop": "g_interaction_index_behaviors_desktop_0_16rspot323_100222.svg",
              "mobile": "g_interaction_index_behaviors_mobile_0_16rspot323_100222.svg"
            }
          },
          {
            "wording": {
              "desktop": "서비스에 대한 자세한 설명을 확인해보세요!",
              "mobile": "상세한 서비스 설명을 확인해보세요!"
            },
            "action": "window.location.href = '/about.php?popup=true';",
            "src": {
              "desktop": "g_interaction_index_behaviors_desktop_1_17rspot84_100222.svg",
              "mobile": "g_interaction_index_behaviors_mobile_1_14rspot822_100222.svg"
            }
          }
        ]
      },
      "notfound": {
        "behaviors": [
          {
            "wording": {
              "desktop": "서비스에 대한 자세한 설명을 확인해보세요!",
              "mobile": "상세한 서비스 설명을 확인해보세요!"
            },
            "action": "window.location.href = '/about.php?popup=true';",
            "src": {
              "desktop": "g_interaction_notfound_behaviors_desktop_0_17rspot84_100222.svg",
              "mobile": "g_interaction_notfound_behaviors_mobile_0_14rspot822_100222.svg"
            }
          },
          {
            "wording": {
              "desktop": "홈리에종의 솔직한 고객 후기를 확인해보세요!",
              "mobile": "솔직한 고객 후기를 확인해보세요!"
            },
            "action": "window.location.href = '/review.php';",
            "src": {
              "desktop": "g_interaction_notfound_behaviors_desktop_1_18rspot674_100222.svg",
              "mobile": "g_interaction_notfound_behaviors_mobile_1_13rspot879_100222.svg"
            }
          }
        ]
      },
      "payment": {
        "behaviors": [
          {
            "wording": {
              "desktop": "서비스에 대한 자세한 설명을 확인해보세요!",
              "mobile": "상세한 서비스 설명을 확인해보세요!"
            },
            "action": "window.location.href = '/about.php?popup=true';",
            "src": {
              "desktop": "g_interaction_payment_behaviors_desktop_0_17rspot84_100222.svg",
              "mobile": "g_interaction_payment_behaviors_mobile_0_14rspot822_100222.svg"
            }
          },
          {
            "wording": {
              "desktop": "홈리에종의 솔직한 고객 후기를 확인해보세요!",
              "mobile": "솔직한 고객 후기를 확인해보세요!"
            },
            "action": "window.location.href = '/review.php';",
            "src": {
              "desktop": "g_interaction_payment_behaviors_desktop_1_18rspot674_100222.svg",
              "mobile": "g_interaction_payment_behaviors_mobile_1_13rspot879_100222.svg"
            }
          }
        ]
      },
      "portdetail": {
        "behaviors": [
          {
            "wording": {
              "desktop": "디자이너의 다른 포트폴리오가 궁금하다면?",
              "mobile": "다른 포트폴리오가 궁금하다면?"
            },
            "action": "var d_id = document.getElementById('prd_ids').getAttribute('cus_d_id'); window.location.href = '/desdetail.php?qqq=' + d_id;",
            "src": {
              "desktop": "g_interaction_portdetail_behaviors_desktop_0_17rspot79_100222.svg",
              "mobile": "g_interaction_portdetail_behaviors_mobile_0_12rspot922_100222.svg"
            }
          }
        ]
      },
      "portfolio": {
        "behaviors": [
          {
            "wording": {
              "desktop": "실제 고객님들의 홈스타일링 후기가 궁금하다면?",
              "mobile": "솔직한 고객 후기를 확인해보세요!"
            },
            "action": "window.location.href = '/review.php';",
            "src": {
              "desktop": "g_interaction_portfolio_behaviors_desktop_0_19rspot856_100222.svg",
              "mobile": "g_interaction_portfolio_behaviors_mobile_0_13rspot879_100222.svg"
            }
          },
          {
            "wording": {
              "desktop": "찾으시는 디자이너가 있으신가요?",
              "mobile": "찾으시는 디자이너가 있으신가요?"
            },
            "action": "var query = instance.mother.constructor.objectToQuery({ collection:\"deslist\",columns:[\"desid\"],where:[[[\"name\",e.target.value]]],limit:[1]});instance.mother.constructor.ajax(query,\"/engine/ContentsLoop.php\",function (data) { var result = JSON.parse(data); if (result.length > 0) { window.location.href = \"/desdetail.php?qqq=\" + result[0].desid; } else { window.location.href = \"/designer.php\"; } });",
            "actionException": [
              {
                "wording": {
                  "desktop": "디자이너의 이름을 입력해주세요!",
                  "mobile": "디자이너의 이름을 입력해주세요!"
                },
                "src": {
                  "desktop": "g_actionException_portfolio_behaviors_desktop_1_0_15rspot082_100222.svg",
                  "mobile": "g_actionException_portfolio_behaviors_mobile_1_0_15rspot082_100222.svg"
                }
              }
            ],
            "src": {
              "desktop": "g_interaction_portfolio_behaviors_desktop_1_13rspot718_100222.svg",
              "mobile": "g_interaction_portfolio_behaviors_mobile_1_13rspot718_100222.svg"
            }
          }
        ]
      },
      "revdetail": {
        "behaviors": [
          {
            "wording": {
              "desktop": "이 현장의 디자이너 이야기, 보러가기!",
              "mobile": "이 현장의 디자이너 이야기, 보러가기!"
            },
            "action": "var d_id = document.getElementById('prd_ids').getAttribute('cus_d_id'); window.location.href = '/desdetail.php?qqq=' + d_id;",
            "src": {
              "desktop": "g_interaction_revdetail_behaviors_desktop_0_15rspot204_100222.svg",
              "mobile": "g_interaction_revdetail_behaviors_mobile_0_15rspot204_100222.svg"
            }
          }
        ]
      },
      "review": {
        "behaviors": [
          {
            "wording": {
              "desktop": "홈리에종 서비스의 자세한 설명이 필요하다면?",
              "mobile": "상세한 서비스 설명을 확인해보세요!"
            },
            "action": "window.location.href = '/about.php?popup=true';",
            "src": {
              "desktop": "g_interaction_review_behaviors_desktop_0_18rspot939_100222.svg",
              "mobile": "g_interaction_review_behaviors_mobile_0_14rspot822_100222.svg"
            }
          },
          {
            "wording": {
              "desktop": "디자이너의 1:1 상담을 받아보세요!",
              "mobile": "디자이너의 1:1 상담을 받아보세요!"
            },
            "action": "window.location.href = '/consulting.php';",
            "src": {
              "desktop": "g_interaction_review_behaviors_desktop_1_13rspot988_100222.svg",
              "mobile": "g_interaction_review_behaviors_mobile_1_13rspot988_100222.svg"
            }
          }
        ]
      }
    },
    "login": {
      "flow": [
        {
          "name": "login",
          "src": {
            "desktop": "g_loginName0_2rspot007_100222.svg",
            "mobile": "g_loginName0_2rspot007_100222.svg"
          },
          "title": {
            "desktop": [
              "남겨주신 성함과",
              "연락처를 알려주세요!"
            ],
            "mobile": [
              "남겨주신 성함과",
              "연락처를 알려주세요!"
            ],
            "src": {
              "desktop": "g_loginTitle_desktop0_3rspot273_100222.svg",
              "mobile": "g_loginTitle_mobile0_3rspot135_100222.svg"
            }
          },
          "children": [
            {
              "title": "성함",
              "src": {
                "desktop": "g_loginFactorTitle00_2rspot706_100222.svg",
                "mobile": "g_loginFactorTitle00_2rspot706_100222.svg"
              }
            },
            {
              "title": "연락처",
              "src": {
                "desktop": "g_loginFactorTitle01_3rspot509_100222.svg",
                "mobile": "g_loginFactorTitle01_3rspot509_100222.svg"
              }
            }
          ]
        },
        {
          "name": "certification",
          "src": {
            "desktop": "g_loginName1_6rspot2_100222.svg",
            "mobile": "g_loginName1_6rspot2_100222.svg"
          },
          "title": {
            "desktop": [
              "인증번호를 발송해드렸습니다.",
              "번호를 입력주세요!"
            ],
            "mobile": [
              "인증번호를 발송해드렸습니다.",
              "번호를 입력주세요!"
            ],
            "src": {
              "desktop": "g_loginTitle_desktop1_4rspot549_100222.svg",
              "mobile": "g_loginTitle_mobile1_4rspot549_100222.svg"
            }
          },
          "children": [
            {
              "title": "인증번호",
              "src": {
                "desktop": "g_loginFactorTitle10_4rspot514_100222.svg",
                "mobile": "g_loginFactorTitle10_4rspot514_100222.svg"
              }
            }
          ]
        }
      ]
    }
  },
  "sub": {
    "loader": "g_iloader_1rspot0_100222.svg",
    "talk": "g_italk_1rspot15_100222.svg",
    "triangle": "g_itriangle_0rspot866_100222.svg",
    "close": "g_iclose_1rspot0_100222.svg",
    "greenClose": "g_igreenClose_1rspot0_100222.svg",
    "arrow": "g_iarrow_0rspot541_100222.svg"
  }
}