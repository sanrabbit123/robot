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
          "name": "상담 신청",
          "href": "/consulting.php"
        }
      ],
      "logo": {
        "name": "type01",
        "color": "#2fa678"
      },
      "src": {
        "logo": "g_logos_navi_7rspot679_033009.svg",
        "words": {
          "desktop": [
            {
              "gray": "g_ngray_navi0_4rspot163_033009.svg",
              "green": "g_ngreen_navi0_4rspot163_033009.svg"
            },
            {
              "gray": "g_ngray_navi1_3rspot99_033009.svg",
              "green": "g_ngreen_navi1_3rspot99_033009.svg"
            },
            {
              "gray": "g_ngray_navi2_3rspot131_033009.svg",
              "green": "g_ngreen_navi2_3rspot131_033009.svg"
            },
            {
              "gray": "g_ngray_navi3_3rspot391_033009.svg",
              "green": "g_ngreen_navi3_3rspot391_033009.svg"
            },
            {
              "gray": "g_ngray_navi4_3rspot417_033009.svg",
              "green": "g_ngreen_navi4_3rspot417_033009.svg"
            }
          ],
          "mobile": [
            {
              "group": "g_monavi_1rspot038_033009.svg"
            }
          ]
        },
        "icons": {
          "search": "g_isearch_0rspot945_033009.svg",
          "hamburger": "g_ihamburger_1rspot567_033009.svg"
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
            "name": "선호 사진 전송",
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
            "name": [
              "설명회",
              "디자이너 신청"
            ],
            "action": [
              {
                "css": "f18partnershipsubmit",
                "js": "window.location.href = '/desevent.php?mode=presentation';"
              },
              {
                "css": "f18designersubmit",
                "js": "window.location.href = '/desevent.php?mode=partnership';"
              }
            ]
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
              "Consulting",
              "Desevent"
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
                "name": "상담 신청",
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
                "name": "상담 신청",
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
                "name": "사진 전송",
                "href": "/login.php"
              },
              {
                "name": "디자이너 파트너십",
                "href": "/desevent.php?mode=partnership"
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
        "logo": "g_logos_foot_3rspot437_033009.svg",
        "desktop": {
          "left": "g_footer_left_1rspot382_033009.svg",
          "right": "g_footer_right_3rspot457_033009.svg"
        },
        "mobile": {
          "A": "g_footer_up_A_3rspot67_033009.svg",
          "B": "g_footer_up_B_3rspot67_033009.svg",
          "C": "g_footer_up_C_3rspot67_033009.svg",
          "D": "g_footer_up_D_3rspot67_033009.svg",
          "Z": "g_footer_down_0rspot987_033009.svg"
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
              "desktop": "g_interaction_about_behaviors_desktop_0_17rspot84_033009.svg",
              "mobile": "g_interaction_about_behaviors_mobile_0_14rspot823_033009.svg"
            }
          },
          {
            "wording": {
              "desktop": "홈리에종의 솔직한 고객 후기를 확인해보세요!",
              "mobile": "솔직한 고객 후기를 확인해보세요!"
            },
            "action": "window.location.href = '/review.php';",
            "src": {
              "desktop": "g_interaction_about_behaviors_desktop_1_18rspot675_033009.svg",
              "mobile": "g_interaction_about_behaviors_mobile_1_13rspot88_033009.svg"
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
                  "desktop": "g_actionException_consulting_behaviors_desktop_0_0_9rspot351_033009.svg",
                  "mobile": "g_actionException_consulting_behaviors_mobile_0_0_9rspot351_033009.svg"
                }
              },
              {
                "wording": {
                  "desktop": "남겨주신 연락처를 알려주세요!",
                  "mobile": "남겨주신 연락처를 알려주세요!"
                },
                "src": {
                  "desktop": "g_actionException_consulting_behaviors_desktop_0_1_14rspot293_033009.svg",
                  "mobile": "g_actionException_consulting_behaviors_mobile_0_1_14rspot293_033009.svg"
                }
              }
            ],
            "src": {
              "desktop": "g_interaction_consulting_behaviors_desktop_0_14rspot871_033009.svg",
              "mobile": "g_interaction_consulting_behaviors_mobile_0_14rspot871_033009.svg"
            }
          }
        ]
      },
      "desdetail": {
        "behaviors": [
          {
            "wording": {
              "desktop": "홈리에종을 통해 1:1 상담을 받아보세요!",
              "mobile": "홈리에종을 통해 1:1 상담을 받아보세요!"
            },
            "action": "window.location.href = '/consulting.php';",
            "src": {
              "desktop": "g_interaction_desdetail_behaviors_desktop_0_15rspot96_033009.svg",
              "mobile": "g_interaction_desdetail_behaviors_mobile_0_15rspot96_033009.svg"
            }
          }
        ]
      },
      "desevent": {
        "behaviors": [
          {
            "wording": {
              "desktop": "홈리에종에서 파트너 디자이너를 모집합니다!",
              "mobile": "홈리에종에서 파트너 디자이너를 모집합니다!"
            },
            "action": "window.location.href = '/desevent.php?mode=partnership';",
            "src": {
              "desktop": "g_interaction_desevent_behaviors_desktop_0_18rspot452_033009.svg",
              "mobile": "g_interaction_desevent_behaviors_mobile_0_18rspot452_033009.svg"
            }
          },
          {
            "wording": {
              "desktop": "추가 포트폴리오 전송이 필요하신가요?",
              "mobile": "추가 포트폴리오 전송이 필요하신가요?"
            },
            "action": "window.location.href = '/desevent.php?mode=portfolio';",
            "src": {
              "desktop": "g_interaction_desevent_behaviors_desktop_1_15rspot983_033009.svg",
              "mobile": "g_interaction_desevent_behaviors_mobile_1_15rspot983_033009.svg"
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
              "desktop": "g_interaction_designer_behaviors_desktop_0_16rspot324_033009.svg",
              "mobile": "g_interaction_designer_behaviors_mobile_0_16rspot324_033009.svg"
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
                  "desktop": "g_actionException_designer_behaviors_desktop_1_0_15rspot082_033009.svg",
                  "mobile": "g_actionException_designer_behaviors_mobile_1_0_15rspot082_033009.svg"
                }
              }
            ],
            "src": {
              "desktop": "g_interaction_designer_behaviors_desktop_1_13rspot718_033009.svg",
              "mobile": "g_interaction_designer_behaviors_mobile_1_13rspot718_033009.svg"
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
              "desktop": "g_interaction_event_behaviors_desktop_0_17rspot84_033009.svg",
              "mobile": "g_interaction_event_behaviors_mobile_0_14rspot823_033009.svg"
            }
          },
          {
            "wording": {
              "desktop": "홈리에종의 솔직한 고객 후기를 확인해보세요!",
              "mobile": "솔직한 고객 후기를 확인해보세요!"
            },
            "action": "window.location.href = '/review.php';",
            "src": {
              "desktop": "g_interaction_event_behaviors_desktop_1_18rspot675_033009.svg",
              "mobile": "g_interaction_event_behaviors_mobile_1_13rspot88_033009.svg"
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
              "desktop": "g_interaction_index_behaviors_desktop_0_16rspot324_033009.svg",
              "mobile": "g_interaction_index_behaviors_mobile_0_16rspot324_033009.svg"
            }
          },
          {
            "wording": {
              "desktop": "서비스에 대한 자세한 설명을 확인해보세요!",
              "mobile": "상세한 서비스 설명을 확인해보세요!"
            },
            "action": "window.location.href = '/about.php?popup=true';",
            "src": {
              "desktop": "g_interaction_index_behaviors_desktop_1_17rspot84_033009.svg",
              "mobile": "g_interaction_index_behaviors_mobile_1_14rspot823_033009.svg"
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
              "desktop": "g_interaction_notfound_behaviors_desktop_0_17rspot84_033009.svg",
              "mobile": "g_interaction_notfound_behaviors_mobile_0_14rspot823_033009.svg"
            }
          },
          {
            "wording": {
              "desktop": "홈리에종의 솔직한 고객 후기를 확인해보세요!",
              "mobile": "솔직한 고객 후기를 확인해보세요!"
            },
            "action": "window.location.href = '/review.php';",
            "src": {
              "desktop": "g_interaction_notfound_behaviors_desktop_1_18rspot675_033009.svg",
              "mobile": "g_interaction_notfound_behaviors_mobile_1_13rspot88_033009.svg"
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
              "desktop": "g_interaction_payment_behaviors_desktop_0_17rspot84_033009.svg",
              "mobile": "g_interaction_payment_behaviors_mobile_0_14rspot823_033009.svg"
            }
          },
          {
            "wording": {
              "desktop": "홈리에종의 솔직한 고객 후기를 확인해보세요!",
              "mobile": "솔직한 고객 후기를 확인해보세요!"
            },
            "action": "window.location.href = '/review.php';",
            "src": {
              "desktop": "g_interaction_payment_behaviors_desktop_1_18rspot675_033009.svg",
              "mobile": "g_interaction_payment_behaviors_mobile_1_13rspot88_033009.svg"
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
              "desktop": "g_interaction_portdetail_behaviors_desktop_0_17rspot79_033009.svg",
              "mobile": "g_interaction_portdetail_behaviors_mobile_0_12rspot922_033009.svg"
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
              "desktop": "g_interaction_portfolio_behaviors_desktop_0_19rspot856_033009.svg",
              "mobile": "g_interaction_portfolio_behaviors_mobile_0_13rspot88_033009.svg"
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
                  "desktop": "g_actionException_portfolio_behaviors_desktop_1_0_15rspot082_033009.svg",
                  "mobile": "g_actionException_portfolio_behaviors_mobile_1_0_15rspot082_033009.svg"
                }
              }
            ],
            "src": {
              "desktop": "g_interaction_portfolio_behaviors_desktop_1_13rspot718_033009.svg",
              "mobile": "g_interaction_portfolio_behaviors_mobile_1_13rspot718_033009.svg"
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
              "desktop": "g_interaction_revdetail_behaviors_desktop_0_15rspot204_033009.svg",
              "mobile": "g_interaction_revdetail_behaviors_mobile_0_15rspot204_033009.svg"
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
              "desktop": "g_interaction_review_behaviors_desktop_0_18rspot939_033009.svg",
              "mobile": "g_interaction_review_behaviors_mobile_0_14rspot823_033009.svg"
            }
          },
          {
            "wording": {
              "desktop": "홈리에종을 통해 1:1 상담을 받아보세요!",
              "mobile": "홈리에종을 통해 1:1 상담을 받아보세요!"
            },
            "action": "window.location.href = '/consulting.php';",
            "src": {
              "desktop": "g_interaction_review_behaviors_desktop_1_15rspot96_033009.svg",
              "mobile": "g_interaction_review_behaviors_mobile_1_15rspot96_033009.svg"
            }
          }
        ]
      },
      "proposal": {
        "behaviors": [
          {
            "wording": {
              "desktop": "pdf로도 다운받으실 수 있어요!",
              "mobile": "pdf로도 다운받으실 수 있어요!"
            },
            "action": "window.location.href = '/about.php?popup=true';",
            "src": {
              "desktop": "g_interaction_proposal_behaviors_desktop_0_12rspot219_033009.svg",
              "mobile": "g_interaction_proposal_behaviors_mobile_0_12rspot219_033009.svg"
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
            "desktop": "g_loginName0_2rspot007_033009.svg",
            "mobile": "g_loginName0_2rspot007_033009.svg"
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
              "desktop": "g_loginTitle_desktop0_3rspot273_033009.svg",
              "mobile": "g_loginTitle_mobile0_3rspot135_033009.svg"
            }
          },
          "children": [
            {
              "title": "성함",
              "src": {
                "desktop": "g_loginFactorTitle00_2rspot706_033009.svg",
                "mobile": "g_loginFactorTitle00_2rspot706_033009.svg"
              }
            },
            {
              "title": "연락처",
              "src": {
                "desktop": "g_loginFactorTitle01_3rspot509_033009.svg",
                "mobile": "g_loginFactorTitle01_3rspot509_033009.svg"
              }
            }
          ]
        },
        {
          "name": "certification",
          "src": {
            "desktop": "g_loginName1_6rspot201_033009.svg",
            "mobile": "g_loginName1_6rspot201_033009.svg"
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
              "desktop": "g_loginTitle_desktop1_4rspot549_033009.svg",
              "mobile": "g_loginTitle_mobile1_4rspot549_033009.svg"
            }
          },
          "children": [
            {
              "title": "인증번호",
              "src": {
                "desktop": "g_loginFactorTitle10_4rspot514_033009.svg",
                "mobile": "g_loginFactorTitle10_4rspot514_033009.svg"
              }
            }
          ]
        }
      ]
    }
  },
  "sub": {
    "loader": "g_iloader_1rspot0_033009.svg",
    "talk": "g_italk_1rspot15_033009.svg",
    "triangle": "g_itriangle_0rspot866_033009.svg",
    "close": "g_iclose_1rspot0_033009.svg",
    "greenClose": "g_igreenClose_1rspot0_033009.svg",
    "arrow": "g_iarrow_0rspot541_033009.svg"
  }
}