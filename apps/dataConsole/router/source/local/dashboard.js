const DashboardJs = function () {
  this.mother = new GeneralJs();
  this.totalContents = this.mother.totalContents;
  this.ea = "px";
  this.vh = "vh";
  this.media = GeneralJs.stacks.updateMiddleMedialQueryConditions;
}

DashboardJs.binaryPath = FRONTHOST + "/middle/inner/manual";

DashboardJs.prototype.returnTreeContents = function () {
  const instance = this;
  const { selfHref, blankHref } = GeneralJs;
  let baseContents;

  baseContents = [
    {
      title: "고객",
      number: 300,
      children: [
        {
          title: "고객 현황과 정보",
          event: () => {
            return function (e) {
              selfHref("/client");
            }
          }
        },
        {
          title: "오늘의 고객 응대",
          event: () => {
            return function (e) {
              selfHref("/sales");
            }
          }
        },
        {
          title: "고객 리포트",
          event: () => {
            return function (e) {
              instance.whiteMaker(window.location.protocol + "//" + window.location.host + "/client?report=client&entire=true&dataonly=true");
            }
          }
        },
        {
          title: "추천서 관리",
          event: () => {
            return function (e) {
              selfHref("/proposal");
            }
          }
        },
        {
          title: "고객 관련 파일",
          event: () => {
            return function (e) {
              instance.whiteMaker(window.location.protocol + "//" + window.location.host + "/file?mode=client&entire=true&dataonly=true");
            }
          }
        },
        {
          title: "고객 응대 매뉴얼",
          children: [
            {
              title: "1차 응대 매뉴얼",
              event: () => {
                return function (e) {
                  instance.manualMaker("firstResponse");
                }
              }
            },
            {
              title: "디자이너 추천서 매뉴얼",
              event: () => {
                return function (e) {
                  instance.manualMaker("designerProposal");
                }
              }
            },
          ]
        },
        {
          title: "홈리에종 서비스",
          children: [
            {
              title: "기본적인 서비스 설명",
              event: () => {
                return function (e) {
                  instance.manualMaker("aboutService");
                }
              }
            },
            {
              title: "서비스의 전체 구조",
              event: () => {
                return function (e) {
                  instance.whiteMaker(window.location.protocol + "//" + window.location.host + "/flow?entire=true&dataonly=true");
                }
              }
            },
          ]
        }
      ]
    },
    {
      title: "프로젝트",
      number: 800,
      children: [
        {
          title: "프로젝트 현황과 정보",
          event: () => {
            return function (e) {
              selfHref("/project");
            }
          }
        },
        {
          title: "시공 프로젝트 현황과 정보",
          event: () => {
            return function (e) {
              selfHref("/builder?mode=construct");
            }
          }
        },
        {
          title: "프로젝트 촬영 관리",
          event: () => {
            return function (e) {
              selfHref("/designer?mode=contents");
            }
          }
        },
        {
          title: "컨텐츠 발행 관리",
          event: () => {
            return function (e) {
              selfHref("/designer?mode=contents");
            }
          }
        },
        {
          title: "컨텐츠 상세 설정",
          event: () => {
            return function (e) {
              selfHref("/contents");
            }
          }
        },
        {
          title: "프로젝트 정산 관리",
          event: () => {
            return function (e) {
              selfHref("/calculation");
            }
          }
        },
        {
          title: "프로젝트 매뉴얼",
          children: [
            {
              title: "현장 미팅과 계약 매뉴얼",
            },
            {
              title: "프로젝트 케어 매뉴얼"
            },
            {
              title: "프로젝트 환불 매뉴얼"
            },
            {
              title: "프로젝트 정산 매뉴얼"
            },
            {
              title: "시공 관리 매뉴얼",
            },
            {
              title: "촬영 컨택 매뉴얼",
            },
            {
              title: "인터뷰 작성 매뉴얼",
            }
          ]
        }
      ]
    },
    {
      title: "디자이너",
      number: 400,
      children: [
        {
          title: "디자이너 현황과 정보",
          event: () => {
            return function (e) {
              selfHref("/designer?mode=normal");
            }
          }
        },
        {
          title: "디자이너 신청자 관리",
          event: () => {
            return function (e) {
              selfHref("/designer?mode=aspirant");
            }
          }
        },
        {
          title: "디자이너 관련 파일",
          event: () => {
            return function (e) {
              instance.whiteMaker(window.location.protocol + "//" + window.location.host + "/file?mode=designer&entire=true&dataonly=true");
            }
          }
        },
        {
          title: "디자이너 가격",
          event: () => {
            return function (e) {
              selfHref("/designer?mode=price");
            }
          }
        },
        {
          title: "디자이너 관리 매뉴얼",
          children: [
            {
              title: "기본적인 관리 매뉴얼"
            },
            {
              title: "신규 디자이너 매뉴얼"
            },
            {
              title: "디자이너별 특징 정리"
            }
          ]
        },
        {
          title: "디자이너 콘솔",
          children: [
            {
              title: "디자이너 콘솔 테스트 계정",
              event: () => {
                return function (e) {
                  blankHref(FRONTHOST + "/designer/dashboard.php?desid=d1701_aa01s");
                }
              }
            },
            {
              title: "디자이너 콘솔 매뉴얼",
              event: () => {
                return function (e) {
                  blankHref(FRONTHOST + "/designer/manual.php?desid=d1701_aa01s");
                }
              }
            },
          ]
        }
      ]
    },
    {
      title: "시스템",
      number: 200,
      children: [
        {
          title: "홈리에종 문서",
          event: () => {
            return function (e) {
              instance.whiteEntireMaker(window.location.protocol + "//" + window.location.host + "/file?mode=document&entire=true&dataonly=true");
            }
          }
        },
        {
          title: "홈리에종 파일",
          event: () => {
            return function (e) {
              instance.whiteEntireMaker(window.location.protocol + "//" + window.location.host + "/file?mode=file&entire=true&dataonly=true");
            }
          }
        },
        {
          title: "홈리에종 알림톡",
          event: () => {
            return function (e) {
              blankHref("https://smartsms.aligo.in/shop/kakaotemplate.html");
            }
          }
        },
        {
          title: "홈리에종 채널",
          children: [
            {
              title: "홈리에종 웹",
              event: () => {
                return function (e) {
                  blankHref(FRONTHOST);
                }
              }
            },
            {
              title: "홈리에종 블로그",
              event: () => {
                return function (e) {
                  blankHref("https://blog.naver.com/homeliaison");
                }
              }
            },
            {
              title: "홈리에종 인스타그램",
              event: () => {
                return function (e) {
                  blankHref("https://instagram.com/homeliaison");
                }
              }
            },
          ]
        }
      ]
    },
  ];
  
  return baseContents;
}

DashboardJs.prototype.returnManualContents = function (key) {
  const instance = this;
  let baseContents;
  let thisTitle;

  if (key === "firstResponse") {
    thisTitle = "1차 응대 매뉴얼";
    baseContents = [
      {
        title: "고객님의 상담 신청 과정",
        video: "1duih82Jbak868K20Hp-9k7tTnGiN-LyA",
        children: [
          {
            title: "상담 신청 페이지",
            body: [
              {
                type: "image",
                source: DashboardJs.binaryPath + "/firstResponse1.jpg",
              },
              {
                type: "description",
                text: [
                  `먼저 고객님께서는 상담 신청 페이지에 접속하여 성함, 연락처, 이메일, 주소, 입주일을 기입하신 후, 요청 사항을 상세히 적어 주시게 됩니다. 그리고 '상담 신청하기' 버튼을 클릭하시면 핸드폰 인증이 진행됩니다. 핸드폰 인증이 정상적으로 완료되면, 고객님께서는 스타일 찾기 페이지로 이동하시게 됩니다.`,
                ]
              }
            ]
          },
          {
            title: "스타일 체크 페이지",
            body: [
              {
                type: "image",
                source: DashboardJs.binaryPath + "/firstResponse2.jpg",
              },
              {
                type: "image",
                source: DashboardJs.binaryPath + "/firstResponse3.jpg",
              },
              {
                type: "description",
                text: [
                  `스타일 찾기 페이지에 접속하시면, 고객님께서는 사전 점검과 집 비는 날짜를 입력하신 후, 가구 구매 예정 금액과 인테리어 예산 등에 대한 정보를 입력해주시게 됩니다. 이후 시공에 대한 니즈를 체크하시고, 스타일 체크를 진행하시게 됩니다. 스타일 체크 과정에서는 제시되는 여러 장의 사진을 찍으시면서 고객님께서 선호하시는 스타일에 대한 정보를 컴퓨터가 파악합니다.`,
                  `그리고 현장의 사진이나 도면 등을 업로드하도록 안내드리는데, 해당 페이지에서 업로드를 완료하신 후 '신청 완료' 버튼을 클릭하시면, 고객님께서는 신청이 완료되었다는 알림톡을 받으시게 됩니다. 동시에, 홈리에종에서는 해당 고객님의 새로운 상담 문의가 도착했다는 알림을 받게 됩니다.`,
                ]
              }
            ]
          },
        ]
      },
      {
        title: "신규 고객 세일즈를 위한 Sa 콘솔",
        video: "1YGEEnhir0NqnSkJgiPo4f8NkGrbGU4my",
        children: [
          {
            title: "Sa 콘솔의 기본 구성과 기능",
            body: [
              {
                type: "image",
                source: DashboardJs.binaryPath + "/firstResponse4.jpg",
              },
              {
                type: "description",
                text: [
                  `고객님께서 문의를 남기시면 기본적으로 Sa 콘솔은 문의일을 기준으로 역순으로 정렬됩니다. 각 고객의 아이디 또는 성함을 클릭하면 고객 정보가 팝업 형태로 표시되며, 왼쪽에는 기본 정보, 오른쪽에는 응대 기록을 작성할 수 있는 공간이 있습니다. 응대를 진행하면서 왼쪽의 기본 정보를 확인하고 수정할 수 있으며, 오른쪽에는 응대 내용을 자세히 작성하면 됩니다.`,
                ]
              },
              {
                type: "image",
                source: DashboardJs.binaryPath + "/firstResponse5.jpg",
              },
              {
                type: "description",
                text: [
                  `좌측 기본 정보에 대해서는 고객과 응대를 하면서 정보를 하나씩 확인하고, 잘못된 정보가 있는 경우 수정해야 합니다. 이 정보는 추천서를 생성하거나 고객 관련 통계를 생성할 때 매우 중요하기 때문에 응대하면서 수정할 수 있는 부분은 최대한 수정해야 합니다.`
                ]
              },
              {
                type: "image",
                source: DashboardJs.binaryPath + "/firstResponse6.jpg",
              },
              {
                type: "description",
                text: [
                  `다시 표로 돌아와서, 우측 중간에 원형 아이콘이 세 개 있습니다. 이를 클릭하면 각 고객에 대한 담당자를 지정할 수 있는 사이드 영역이 열립니다. 이곳에서 담당자를 지정하고, 컬럼명을 오른쪽 클릭하여 정렬 기능을 이용하여 담당자별로 응대해야 할 고객과 현재 응대 중인 고객을 확인할 수 있습니다. 담당자 지정, 정렬, 그리고 고객님 이름을 눌러 팝업을 띄운 상태에서 응대를 하는 방식으로 1차 응대를 운영하시면 됩니다.`,
                ]
              },
            ]
          },
          {
            title: "예상 서비스와 예상 종료일의 중요성",
            body: [
              {
                type: "description",
                text: [
                  `고객 팝업에서 특히 좌측에 있는 예상 서비스와 예상 종료일이라는 항목은 매우 중요합니다. 이 두 항목은 자동으로 디자이너 추천서와 스타일링 계약서를 작성할 때 아주 핵심적인 정보가 되며, 정확하게 기입해야 합니다.`,
                  `입주 예정일을 기준으로 고객님이 언제부터 시작하고 언제 종료될 예정인지 대략적인 감을 파악하여 예상 종료일을 기입해야 합니다. 예상 기간은 서비스에 따라 달라지며, 홈퍼니싱은 30일, 홈스타일링은 45일, 토탈 스타일링은 60일을 기준으로 잡아 예상 종료일을 체크해주시면 됩니다.`,
                  `예상 종료일에 따라 컴퓨터가 서비스를 분석하고 예상 시작일을 계산합니다. 시작일과 종료일을 기준으로 디자이너들의 일정을 조정하고, 자동으로 추천서와 계약서를 작성합니다. 이러한 과정은 전산상으로 여러 프로세스에서 진행되기 때문에, 예상 종료일을 상당히 정확한 수준으로 체크해주셔야 합니다.`,
                ]
              }
            ]
          },
          {
            title: "잘못된 주소를 고치는 방법",
            body: [
              {
                type: "image",
                source: DashboardJs.binaryPath + "/firstResponse7.jpg",
              },
              {
                type: "description",
                text: [
                  `고객님의 주소를 정확하게 적는 것이 매우 중요합니다. 경기도 의정부시와 같이 표준 주소 체계에 맞지 않는 주소를 적으실 때가 있습니다. 이 경우에는 필히 표준 주소 체계 형식으로 주소를 수정해주셔야 합니다. 디자이너 주소와 고객님 주소를 근거로 해당 현장이 출장비가 발생하는 거리인지, 출장비가 얼마 발생할지 등을 자동으로 계산하기 때문입니다. 만약 주소를 잘못 적으면 추천서도 만들어지지 않고 디자인비도 계산할 수 없습니다.`,
                ]
              },
              {
                type: "image",
                source: DashboardJs.binaryPath + "/firstResponse8.jpg",
              },
              {
                type: "description",
                text: [
                  `또한, 새아파트의 경우 주소가 안 나온 경우가 있습니다. 이때는 네이버에서 새 아파트를 검색하신 다음에 옆에 있는 건물이나 학교, 식당과 같은 곳의 주소로 적고, 새아파트명을 그 주소 뒤에 붙여주셔야 합니다. 이렇게 함으로써 대략적인 거리를 구할 수 있으며, 자동 연산에 필요한 주소를 제공하여 디자인비를 구하고 추천서를 작성할 수 있습니다.`,
                ]
              },
            ]
          },
          {
            title: "부재중 알림과 서비스 소개 보내기",
            body: [
              {
                type: "image",
                source: DashboardJs.binaryPath + "/firstResponse9.jpg",
              },
              {
                type: "description",
                text: [
                  `고객님의 이름을 클릭하면 팝업이 열리는데, 이 팝업에서 하단의 검색바 좌측에 카카오톡 아이콘과 같은 아이콘이 있습니다. 이 아이콘을 클릭하면 추천서 자동 생성, 페이퍼 출력, 부재 중인 고객에게 순수 부재 중 알림 보내기, 고객용 서비스 소개 등의 기능이 제공됩니다. 부재 중인 고객에게는 "순수 부재 중" 버튼을 눌러 부재 중 알림을 보낼 수 있으며, 응대 중에 서비스 소개 페이지를 전송해야 하는 경우 "고객용 서비스 소개" 버튼을 누르면 됩니다.`,
                ]
              },
            ]
          },
        ]
      },
      {
        title: "스타일 체크와 Sa 콘솔",
        children: [
          {
            title: "고객님이 선택하신 사진과 보내신 사진 보기",
            body: [
              {
                type: "image",
                source: DashboardJs.binaryPath + "/firstResponse10.jpg",
              },
              {
                type: "image",
                source: DashboardJs.binaryPath + "/firstResponse11.jpg",
              },
              {
                type: "description",
                text: [
                  `고객님의 이름을 클릭하면 나타나는 팝업에서, 오른쪽 상단에 "log"라는 글씨가 있습니다. 해당 글씨를 클릭하면, 응대 기록을 남길 수 있는 히스토리캔이 사라지고 새로운 영역이 나타납니다. 이 영역에는 고객님의 활동 내역이 기록되어 있습니다. 우측 상단을 다시 확인하면, "사진 보기"라는 빨간 글씨가 있습니다. 이를 클릭하면, 고객님이 스타일체크 과정에서 선택한 사진과 현장에서 찍은 사진, 선호하는 사진 등을 한꺼번에 확인할 수 있습니다. 이를 통해 고객님의 현장 상황과 선호하는 스타일을 파악할 수 있습니다.`,
                ]
              }
            ]
          },
          {
            title: "고객님의 현장, 선호 사진 올려주기",
            body: [
              {
                type: "image",
                source: DashboardJs.binaryPath + "/firstResponse16.jpg",
              },
              {
                type: "description",
                text: [
                  `고객님이 처음 상담을 신청할 때, 현장 사진 파일을 제출해주시는 것이 가장 이상적입니다. 하지만 고객님으로부터 카카오 채널을 통해 직접 제공되는 경우도 있습니다. 이 경우에는 홈리에종에서 해당 고객의 데이터베이스에 직접 현장 사진을 업로드해야 합니다. 업로드하는 방법은 위에서 설명한 "사진 보기" 영역을 클릭하여 고객님이 보내신 사진 탭을 연 후, 고객님의 사진을 드래그 앤 드롭하면, 이 사진이 현장 사진인지 선호 사진인지 물어보게 됩니다. 해당하는 종류를 선택하시면 고객님의 데이터베이스에 사진이 등록됩니다.`,
                ]
              }
            ]
          },
          {
            title: "고객님이 선택하신 사진과 보내신 사진 보기",
            body: [
              {
                type: "image",
                source: DashboardJs.binaryPath + "/firstResponse17.jpg",
              },
              {
                type: "image",
                source: DashboardJs.binaryPath + "/firstResponse18.jpg",
              },
              {
                type: "description",
                text: [
                  `현장 사진이나 선호 사진의 경우, 고객님의 팝업창에 들어가서 드래그 앤 드롭으로 사진을 업로드하시면 됩니다. 그러나 분류하기 어려운 파일이나 사진이 제공되는 경우도 있습니다. 이 경우, 고객님의 파일이나 사진을 홈리에종 공용 서버에 저장해야 합니다. 홈리에종 공용 서버에 접근하는 방법은 하단 검색바 좌측에 폴더 모양의 아이콘을 클릭하면 팝업창이 나타나며 고객 서버에 접근할 수 있습니다. 해당하는 년도의 고객 폴더로 들어간 후, 고객명과 날짜를 기록하여 폴더를 생성하시고 그 폴더 안에 기타 파일을 저장하시면 됩니다.`,
                ]
              }
            ]
          },
          {
            title: "스타일 체크와 디자이너 추천서 자동 생성",
            body: [
              {
                type: "description",
                text: [
                  `홈리에종의 모든 사진에는 태그와 경향성 값이 포함되어 있습니다. 고객이 스타일 체크 단계에서 사진들을 확인하면, 선호하는 성향의 값들이 자동으로 추출되어 해당 스타일 값을 잘 파악하는 디자이너에게 우선 순위가 부여되어 추천서 작성에 반영됩니다. 그러나 고객이 스타일 체크를 수행하지 않은 경우에는 추천서를 자동으로 생성할 수 없기 때문에, 디자이너 추천서를 수동으로 작성해야 합니다. 추천서 수동 생성 방법은 디자이너 추천서 설명 메뉴얼에서 자세히 설명하고 있습니다.`,
                ]
              }
            ]
          },
          {
            title: "추천서 자동 생성이 안 될 경우 체크 사항",
            body: [
              {
                type: "description",
                text: [
                  `고객이 스타일 체크를 정상적으로 완료했음에도 추천서가 자동으로 생성되지 않는 경우가 종종 발생합니다. 이는 대개 고객이 주소를 표준 주소 체계에 맞게 기입하지 않아 발생하는 문제이거나, 예상 종료일이 적절하지 않은 경우에도 발생할 수 있습니다. 따라서 이러한 경우에는 고객이 기재한 주소를 확인한 후, 주소에 문제가 없다면 예상 종료일을 조정하여 추천서 자동 생성을 다시 시도해 보시기 바랍니다.`,
                ]
              }
            ]
          },
        ]
      },
      {
        title: "기본적인 1차 응대 과정",
        video: "1AymPLlvvcviW5PWAqKCBaZvoU2hppRWP",
        children: [
          {
            title: "1차 응대 사전 준비 사항",
            body: [
              {
                type: "image",
                source: DashboardJs.binaryPath + "/firstResponse12.jpg",
              },
              {
                type: "description",
                text: [
                  `1차 응대를 진행하기 전에 고객님의 정보와 요청 사항을 한 번 읽어보고 문제가 없는지를 검토해야 합니다. 주로 네이버 부동산이나 네이버 맵을 통해 주소에 문제가 없는지, 해당 아파트의 평형은 어떤지, 평수는 제대로 적은 것인지(평의 개념을 몰라 미터 제곱을 평수에 적으신 분들도 많습니다) 등을 사전에 확인해야 합니다. 네이버 부동산에서 반드시 고객님 현장과 평수, 그리고 고객님의 요청사항을 미리 파악한 후 1차 응대를 진행해주세요.`,
                ]
              }
            ]
          },
          {
            title: "1차 응대 시작과 전체적인 플로우",
            body: [
              {
                type: "description",
                text: [
                  `1차 응대 준비가 끝났다면 해당 Sa 콘솔에서 해당 고객님 팝업창을 열어놓고, 좌측 상단에 있는 고객님 이름을 클릭합니다. 그러면 자동으로 전화가 걸리며 수화기를 들면 고객님과 연결됩니다. 그리고 사전에 준비해놓았던 모든 내용을 함께 모니터에 띄어 고객님 응대를 진행해주시면 됩니다. 응대 플로우는 다음과 같습니다.`,
                ]
              },
              {
                type: "block",
                text: [
                  `1. 인사`,
                  `2. 정보 확인`,
                  `    1. 주소 및 평수 확인`,
                  `    2. 시공을 하신다면 어느정도 하시는지`,
                  `    3. 제품은 어느정도로 변경하시는 지`,
                  `    4. 어떤 것이 필요해서 홈리에종에 문의하시게 되었는지`,
                  `3. 가족 구성원 확인`,
                  `4. 일정 확인 (입주 예정일, 희망 종료일 등)`,
                  `5. 계약 상태 확인 (자가/전월세)`,
                  `6. 홈리에종 서비스 설명`,
                  `7. 서비스별 기간 설명`,
                  `8. 인테리어 예산 개념에 대한 설명`,
                  `9. 풀 프로세스에 대한 설명`,
                  `10. 고객님께 궁금한 점 들어보기`,
                ]
              },
            ]
          },
          {
            title: "홈리에종 서비스와 서비스 종류, 기간",
            body: [
              {
                type: "description",
                text: [
                  `홈리에종 서비스는 고객과 디자이너를 매칭한 뒤 인테리어 프로젝트를 종합적으로 관리해주는 서비스입니다. 다른 매칭 플랫폼과 달리, 인테리어 프로젝트가 완료될 때까지 케어를 제공하며, 시공만 하는 것이 아니라 가구, 소품, 패브릭 등 스타일링 단계까지 모두 책임지고 관리합니다.`,
                ]
              },
              {
                type: "description",
                text: [
                  `일반적으로 인테리어를 고려할 때, 많은 사람들이 시공만을 고려하는 경우가 많습니다. 하지만 인테리어는 디자인 단계부터 시작되며, 디자이너의 디자인을 통해 시공 범위가 결정되고 시공이 완료된 후에도 스타일링 단계까지 완전한 완성을 이루어야 합니다. 상업 인테리어에서는 이러한 과정이 일반적으로 수행되지만, 주거 인테리어에서는 집수리와 같은 개념으로만 생각하는 경우가 많습니다. 이러한 현실을 극복하기 위해 홈리에종은 주거 인테리어에 대한 온전한 경험을 제공하기 위해 디자인 단계부터 스타일링까지 모든 과정을 함께 진행하는 서비스를 제공합니다. 홈리에종 서비스의 종류는 다음과 같습니다.`,
                ]
              },
              {
                type: "block",
                text: [
                  `1. 홈퍼니싱 : 시공없이 스타일링만 진행하여 인테리어를 끝내는 서비스, 30일 소요`,
                  `2. 홈스타일링 : 부분 시공과 스타일링으로 진행하는 효과적인 인테리어, 45일 소요`,
                  `3. 토탈 스타일링 : 집 전체 시공과 스타일링까지 진행하는 전체 인테리어, 60일 소요`,
                  `4. 엑스트라 스타일링 : 토탈 스타일링의 프리미엄 버전, 60일 소요`,
                ]
              },
            ]
          },
          {
            title: "인테리어 예산 개념과 비용의 구성",
            body: [
              {
                type: "description",
                text: [
                  `홈리에종이 설명하는 인테리어 예산은 세 가지로 나누어집니다. 시공 예산, 가구 구매 예산, 디자인비로 구성됩니다. 시공 예산은 시공에 쓰이는 비용을 의미하며, 가구 구매 예산은 가구, 소품, 패브릭 등 구매에 필요한 비용을 의미합니다. 디자인비는 디자이너에게 지불하는 비용으로, 인테리어 프로젝트가 시작하기 전에 홈리에종에 미리 지불하게 됩니다.`,
                ]
              },
            ]
          },
          {
            title: "홈리에종 풀 프로세스",
            body: [
              {
                type: "description",
                text: [
                  `1차 응대가 이루어지면 홈리에종은 고객님께 디자이너 추천서를 보내며, 고객님이 추천서에서 디자이너를 선택하신 후, 계약금(33만원)을 결제하시면 디자인 계약이 체결됩니다. 그리고 홈리에종은 디자이너에게 연락하여 고객님과의 현장 미팅 일자를 조율합니다. 현장 미팅 이후에는 고객님께 다시 전화하여 진행 여부를 확인하며, 고객님이 계속 진행하겠다고 하시면 홈스타일링 계약서를 작성하고 잔금을 안내합니다. 고객님께서 잔금을 지불하시고 계약서에 서명을 완료하면 홈스타일링 프로젝트가 본격적으로 시작되며 디자이너가 디자인 작업을 시작합니다. 인테리어 과정이 끝나면 홈리에종은 현장 확인과 함께 현장 촬영을 진행하고, 촬영이 끝나면 컨텐츠 발행과 최종 마무리를 합니다.`,
                ]
              },
            ]
          },
        ]
      },
      {
        title: "Sa-c 콘솔과 고객 리포트",
        video: "19LAM0JwtwNiWN4pvtzqwxX_j6etXD0XV",
        children: [
          {
            title: "Sa-c 콘솔",
            body: [
              {
                type: "image",
                source: DashboardJs.binaryPath + "/firstResponse13.jpg",
              },
              {
                type: "description",
                text: [
                  `Sa-c 콘솔은 CX팀에서 사용하는 Sa의 보조 콘솔입니다. 이 콘솔은 고객 리스트를 정리하고 해당 고객이 타겟 고객인지, 우선순위가 어떻게 되는지, 계약 가능성이 있는지 등을 판단하고 기입할 수 있습니다. Sa-c 콘솔에 접근하는 방법은 Sa 아이콘을 오른쪽 클릭하거나, Sa 콘솔 우측 하단에 있는 ‘C’ 버튼을 누르면 됩니다. CX팀 회의 때 이 콘솔을 열어놓고, 각각의 고객 요청 사항을 보면서 우선순위와 타겟 여부를 결정하고 담당자를 분배하는 시간을 가질 수 있습니다.`,
                ]
              }
            ]
          },
          {
            title: "우선순위와 타겟 고객",
            body: [
              {
                type: "description",
                text: [
                  `담당자를 배정하기 전에 관리자는 고객님의 요청 사항을 기반으로하여 홈리에종의 타겟 고객 여부를 판단하고, 우선순위를 정합니다. 타겟 고객 여부는 고객님이 시공만을 원하는지, 지방 고객인데 전체 시공을 원하는지, 한 공간만을 원하는지, 거주중인데 시공을 원하는지, 또는 일단 견적서를 빨리 받아보고 싶은지 등을 종합적으로 고려하여 결정됩니다. 이러한 과정은 계속해서 발전되어야 하며, 꾸준한 업데이트가 필요합니다.`,
                ]
              }
            ]
          },
          {
            title: "계약 가능성의 의미",
            body: [
              {
                type: "description",
                text: [
                  `계약 가능성은 처음부터 알 수 없고, 실제로 1차 응대를 거치면서 해당 고객님의 호의도가 높고 상황이 좋으며 여러 조건상에서 계약을 할 것 같은 고객일 경우에 표시해놓는 칸입니다. 해당 칸은 해당 고객이 결국 드랍이 된다 하더라도 업데이트를 실시간으로 해야 합니다. 이 수치를 통해 앞으로 계약자가 얼마나 더 나올지를 예상하기 때문입니다. 관리자는 응대 실무자들이 1차 응대와 피드백 통화 후 해당 계약 가능성을 체크하도록 하여야 합니다.`,
                ]
              }
            ]
          },
          {
            title: "하하 전송의 의미와 전송법",
            body: [
              {
                type: "description",
                text: [
                  `하하 전송은 고객이 타겟 고객이 아니고, 우선순위가 낮으며 계약 가능성도 낮아 보이는 고객들에게 1차 응대를 하지 않고, 이래도 진행할 것인지를 묻는 알림톡을 보내는 기능입니다. 해당 고객의 하하 전송 칸을 클릭하면 '하하 전송' 팝업이 뜨며, 그 팝업에 있는 버튼을 누르면 해당 고객에게 알림톡이 전송됩니다. 하하 전송의 알림톡 내용은 다음과 같습니다.`,
                ]
              },
              {
                type: "block",
                text: [
                  `안녕하세요, 고객님!`,
                  `원활한 상담을 위해 아래 3가지 문항 체크해 보시고, 해당 사항이 없으시면 상담 진행을 도와드리겠습니다.`,
                  ``,
                  `1. 시공 서비스'만' 필요하신가요? 홈리에종은 시공 업체가 아니기 때문에 시공 서비스'만'을 제공하지 않습니다.`,
                  ``,
                  `2. 거주 중에 시공을 진행하시나요? 홈리에종은 거주중인 현장의 시공을 진행하지 않습니다. 거주중일때는 시공 없이 스타일링만으로 집을 확 바꿔보세요!`,
                  ``,
                  `3. 일단 견적서만 받아보기를 원하시나요? 홈리에종은 디자이너 매칭 후, 디자이너와의 상담을 거쳐 시공 범위를 정하는 서비스로 견적서만 먼저 제공해드리기는 어렵습니다.`,
                  ``,
                  `홈리에종은 디자이너와의 매칭 후 시공을 포함하여 스타일링 서비스까지, 전체 인테리어 과정을 함께 진행합니다.`,
                  `위 3가지 유의 사항 체크해 보시고, 유선 상담을 원하시면 홈리에종 카카오 채널을 통해 성함을 남겨주세요!`,
                ]
              },
            ]
          },
          {
            title: "고객 리포트",
            body: [
              {
                type: "image",
                source: DashboardJs.binaryPath + "/firstResponse14.jpg",
              },
              {
                type: "image",
                source: DashboardJs.binaryPath + "/firstResponse15.jpg",
              },
              {
                type: "description",
                text: [
                  `Sa 콘솔은 기본적으로 자동으로 통계를 내는 리포트를 제공합니다. Sa 콘솔의 우측 하단에 있는 문서 아이콘을 누르면 팝업 형태로 리포트가 제공됩니다. 우측 상단에 있는 날짜 범위를 형식에 맞게 적어주시면 해당 날짜에 맞는 리포트가 자동으로 제공되며, 각각의 숫자를 클릭하면 그 숫자에 해당되는 고객 리스트가 Sa 콘솔에 자동으로 표시됩니다. 리포트는 다른 버전으로도 제공됩니다. 리포트 팝업에서 우측 상단에 있는 ‘리포트 전환’을 클릭하면 월별 리포트에서 일별 리포트로 전환되며, 두 개의 리포트를 통해 CX팀의 상황과 성과를 한눈에 볼 수 있습니다.`,
                ]
              }
            ]
          },
        ]
      },
    ];
  } else if (key === "designerProposal") {
    thisTitle = "추천서 매뉴얼";
    baseContents = [
      {
        title: "추천서 작성 전 사전 준비",
        video: "1-eNJEE874VzwLnHeteyPSmwXrRwzsCKN",
        children: [
          {
            title: "추천서를 작성하기 전 알아야 할 고객 정보",
            body: [
              {
                type: "description",
                text: [
                  `추천서를 작성하기 전에는 먼저 고객의 선호 스타일을 파악해야 합니다. 이를 위해 고객이 선택한 스타일 체크 사진이나 보내주신 선호 사진을 참고하여 원하는 스타일을 대략적으로 파악하고, 그 내용을 바탕으로 어떤 디자이너를 추천할지 결정해야 합니다. 그리고 고객의 예상 일정과 서비스를 파악해야 합니다. 언제부터 시작해서 언제까지 진행할 것인지, 홈퍼니싱이나 토탈 스타일링 중 어떤 것을 원하는지 등을 고려하여 추천합니다. 또한, 고객이 가지고 있는 여러 조건을 파악해야 합니다. 주소, 자가인지 전월세인지 여부, 가족 구성원의 상태, 거주중인지 여부, 부분 공간을 원하는지 여부, 온라인을 원하는지 여부 등을 판단하여 가능한 조건에 맞는 디자이너를 추천합니다. 마지막으로, 고객의 특이사항을 고려하여 최종적으로 추천할 서비스를 확정하고 디자이너를 선택합니다.`,
                ]
              },
              {
                type: "block",
                text: [
                  `1. 선호 스타일 파악`,
                  `2. 예상 일정 파악`,
                  `3. 예상 서비스 파악`,
                  `4. 고객이 가지고 있는 조건 고려`,
                  `  4-1 고객의 주소`,
                  `  4-2 자가인지 전월세인지 여부`,
                  `  4-3 가족 구성원의 상태`,
                  `  4-4 거주중인지 여부`,
                  `  4-5 부분 공간만 원하는지 여부`,
                  `  4-6 온라인 여부`,
                  `5. 고객의 특이사항`,
                ]
              }
            ]
          },
          {
            title: "추천서를 자동으로 생성하는 방법",
            body: [
              {
                type: "image",
                source: DashboardJs.binaryPath + "/designerProposal1.jpg",
              },
              {
                type: "description",
                text: [
                  `고객의 조건과 예상 종료일, 예상 서비스가 올바르게 기입되어 있으면 추천서를 자동으로 생성할 수 있습니다. 고객의 주소는 표준 체계에 맞게 기입되어야 하며, 예상 종료일과 예상 서비스도 정확하게 기입되어야 합니다. 또한, 다른 조건들도 1차 응대 과정에서 모두 기입과 수정이 완료되어 있어야 합니다. 모든 조건이 맞다면 하단 검색바 좌측에 있는 카카오톡 모양의 아이콘을 누르면 '추천서 자동 생성' 버튼을 클릭할 수 있습니다. 해당 버튼을 클릭하면 일정 시간이 소요되며, 자동으로 디자이너 추천서가 생성됩니다. 자동으로 생성된 추천서는 고객의 조건과 디자이너의 일정, 서비스, 조건에 따라 컴퓨터가 판단하여 작성된 것이므로 그대로 보내도 문제 없는 수준으로 만들어집니다. 이 추천서는 슬렉을 통해 링크의 형태로 제공됩니다.`,
                ]
              }
            ]
          },
          {
            title: "추천서가 자동 생성되지 않을 때의 생성 방법",
            body: [
              {
                type: "image",
                source: DashboardJs.binaryPath + "/designerProposal2.jpg",
              },
              {
                type: "description",
                text: [
                  `추천서 자동 생성 기능을 사용할 때 모든 조건을 기입했음에도 불구하고 생성되지 않는 경우가 있습니다. 이 경우 대표적으로 두 가지 이유가 있습니다. 첫째, 예상 종료일과 예상 서비스에 따라 고객 프로젝트의 예상 시작일과 종료일을 계산하게 되는데, 그 기간 안에 작업 가능한 디자이너가 없는 경우입니다. 이는 대개 프로젝트가 너무 급한 경우에 발생합니다. 이런 경우, 예상 종료일을 뒤로 미루는 등의 기간 조정을 통해 추천서를 생성할 수 있으며, 또는 디자이너와의 소통을 통해 디자이너 일정을 임시적으로 열어 추천서를 만들 수도 있습니다. 둘째, 고객의 주소가 잘못 입력되어 있을 경우입니다. 주소는 반드시 표준 주소 체계로 입력되어야 합니다. 반드시 도로명 주소를 사용해야 한다고 생각하면 쉽습니다. 새아파트와 같이 도로명 주소가 없는 경우, 새아파트 부지 근처의 아무 건물을 찾아 도로명 주소를 입력한 후 새아파트 이름만 뒤에 추가해주시면 됩니다. 추천서가 자동 생성되지 않는 경우, 두 번째 이유가 가장 많으므로, 고객의 주소를 반드시 확인하시고 표준 도로명 주소 체계로 수정한 후 자동 생성을 시도하시기 바랍니다.`,
                ]
              }
            ]
          },
        ]
      },
      {
        title: "추천서와 Pr 콘솔",
        video: "1Om-3RePBU6CrJfk6ufVCMOJGcBlyiQV6",
        children: [
          {
            title: "추천서 접근 방법과 Pr 콘솔",
            body: [
              {
                type: "image",
                source: DashboardJs.binaryPath + "/designerProposal3.jpg",
              },
              {
                type: "image",
                source: DashboardJs.binaryPath + "/designerProposal4.jpg",
              },
              {
                type: "description",
                text: [
                  `좌측 하단에 있는 Pr 아이콘을 클릭하면 Pr-r 콘솔에 접속할 수 있습니다. 이 콘솔에는 추천서가 만들어진 시간순으로 정렬된 목록과 해당 추천서와 관련된 기능이 제공됩니다. 추천서를 보고 싶다면 해당 추천서를 클릭하시면 됩니다. 클릭을 하시면, Pr-c 콘솔이 자동으로 열리며 추천서가 어떻게 만들어졌는지 차례대로 로드되어 표시됩니다.`,
                ]
              },
            ]
          },
          {
            title: "디자이너 명수와 순서 조정",
            body: [
              {
                type: "image",
                source: DashboardJs.binaryPath + "/designerProposal5.jpg",
              },
              {
                type: "description",
                text: [
                  `추천서를 로드한 후 수정을 할 때, 디자이너 수를 변경하고 싶을 때가 있습니다. 이 경우에는 상단의 초록색 글씨 "디자이너 선택"을 클릭합니다. 그러면 디자이너 수를 조정할 수 있는 창이 표시되며, 거기에서 디자이너 수를 조정할 수 있습니다. 디자이너 수를 늘리면 현재 디자이너 리스트를 유지하고 새로운 빈 공간이 추가되며, 디자이너 수를 줄이면 앞쪽의 디자이너들은 유지되고, 줄어든 숫자만큼 뒤쪽에 있는 디자이너들은 삭제됩니다.`,
                ]
              }
            ]
          },
          {
            title: "서비스와 디자이너 선택, 그리고 일정 조정",
            body: [
              {
                type: "image",
                source: DashboardJs.binaryPath + "/designerProposal6.jpg",
              },
              {
                type: "description",
                text: [
                  `추천서를 로드한 후 수정을 할 때, 다른 디자이너를 선택해야 할 때가 있습니다. 이때, 디자이너 리스트에는 비활성화된 디자이너들이 있습니다. 해당 디자이너가 해당 서비스에서는 활동이 불가능하다는 의미입니다. 만약 서비스를 변경하려면, 상단의 초록색 글씨 "서비스 선택"을 눌러 추천할 서비스를 변경할 수 있습니다. 올바른 추천 서비스를 선택하고 활성화된 디자이너를 선택하면 됩니다. 디자이너를 검색하여 선택하려면, 상단의 검은색 글씨 "디자이너 이름"을 클릭하여 제공되는 디자이너를 검색할 수 있는 기능을 통해 디자이너를 선택합니다.`,
                ]
              },

              {
                type: "image",
                source: DashboardJs.binaryPath + "/designerProposal7.jpg",
              },
              {
                type: "description",
                text: [
                  `활성화된 디자이너를 선택할 때, 모두 가능한 것은 아닙니다. 일정이 불가능하거나 거리가 멀어서 안 되는 경우도 있고, 거주지가 불가능하거나 부분적인 공간이 안되거나 온라인이 안 되는 경우도 있습니다. 가능한 디자이너는 경고 표시 없이 순탄하게 선택할 수 있지만, 안 되는 디자이너는 선택이 불가능하며, 되지 않는 이유를 표시해줍니다.`,
                ]
              },

              {
                type: "image",
                source: DashboardJs.binaryPath + "/designerProposal8.jpg",
              },
              {
                type: "description",
                text: [
                  `안 되는 디자이너 중에서도 추천하고 싶은 디자이너가 있을 수 있습니다. 이 경우, 해당 디자이너와 연락하여 합의 후, 일정을 임시적으로 변경하거나 체크리스트 값을 수정할 수 있습니다. 이때, 해당 디자이너의 이름을 오른쪽 클릭하면 해당 디자이너의 체크리스트가 팝업 형식으로 나와 쉽게 조정할 수 있습니다.`
                ]
              },
            ]
          },
          {
            title: "디자이너 가격 조정",
            body: [
              {
                type: "image",
                source: DashboardJs.binaryPath + "/designerProposal9.jpg",
              },
              {
                type: "description",
                text: [
                  `디자이너의 가격은 고객님 공간의 평수, 서비스의 종류, 디자이너의 가사점에 따라 자동으로 조정됩니다. 가격은 컴퓨터가 계산하는 값 그대로 이용하시면 됩니다. 만약 가격 정보를 자세히 확인하고 싶다면, 가격이 표시된 곳을 클릭하시면 됩니다. 클릭하면 초록색 팝업창이 열리며, 그곳에서 가격의 세부 정보를 확인하실 수 있습니다. 출장비가 발생하는 경우, 초록색 팝업창에서 출장 거리와 시간, 그리고 비용이 제공됩니다. 해당 프로젝트의 출장비 여부와 출장 금액을 꼭 확인하신 후 고객님께 사전에 안내해야 합니다. 출장비를 청구하고 결제하는 방법은 프로젝트 메뉴얼에서 안내하고 있습니다.`,
                ]
              }
            ]
          },
          {
            title: "디자이너 사진 선택",
            body: [
              {
                type: "image",
                source: DashboardJs.binaryPath + "/designerProposal10.jpg",
              },
              {
                type: "description",
                text: [
                  `디자이너를 선택한 후, 서비스 방식과 디자이너 요금을 확인한 뒤, 해당 디자이너의 사진을 선택해야 합니다. 디자이너 사진 선택 버튼을 누르면 해당 디자이너를 잘 보여줄 수 있는 사진 조합을 편집할 수 있는 창이 나타납니다. 좌측은 고객님이 보게 될 사진의 조합이며, 우측에는 해당 디자이너에서 사용할 수 있는 모든 사진이 표시됩니다. 우측의 사진들을 드래그 앤 드롭으로 좌측에 있는 사진 자리에 배치하면 됩니다. 가로 사진을 세로 사진으로 바꾸거나, 세로 사진 두 장을 가로로 바꾸고 싶다면, 각각의 사진 자리를 눌러 구성을 변경할 수 있습니다. 이를 통해 고객에게 보여줄 최적의 사진 조합을 구성할 수 있습니다. 사진 조합 아래에는 디자이너에 대한 간단한 3줄 설명이 있습니다. 이 컨텐츠는 사진 조합과 함께 고객에게 제공되는 정보로, 해당 디자이너를 간단히 소개하는 역할을 합니다. 사진 조합과 함께 3줄의 설명까지 완성하시면 해당 디자이너에 대한 추천서 작성이 완료됩니다.`,
                ]
              }
            ]
          },
          {
            title: "추천서 업데이트",
            body: [
              {
                type: "description",
                text: [
                  `디자이너를 선택하고, 가격 확인 및 사진 조합을 완료한 후, 추천서를 업데이트하려면 우측 하단의 "Update" 버튼을 클릭해야 합니다. 추천서는 자동으로 저장되지 않으므로, 중간에 나가거나 업데이트 버튼을 누르지 않은 경우 저장되지 않으므로 주의해야 합니다.`,
                ]
              }
            ]
          },
          {
            title: "추천서 수동으로 생성하기",
            body: [
              {
                type: "image",
                source: DashboardJs.binaryPath + "/designerProposal11.jpg",
              },
              {
                type: "description",
                text: [
                  `조건이 맞지 않아 추천서가 자동으로 끝까지 생성되지 않는 경우가 있습니다. 이 경우, 수동으로 추천서를 생성해야 합니다. 좌측 하단의 "C" 이니셜 버튼을 클릭하여 Pr-c 콘솔로 이동한 후, 상단에서 고객을 선택하고 서비스를 고른 다음, 디자이너 수와 디자이너 및 사진 선택을 진행해야 합니다. 그러나 이는 굉장히 특수한 경우이므로, 되도록이면 고객과 디자이너와 협의하여 조건을 맞춘 후, 추천서 자동 생성을 통해 추천서를 작성하는 것이 좋습니다.`,
                ]
              }
            ]
          },
        ]
      },
      {
        title: "디자이너 추천서 발송",
        video: "1Slc3IOyneRIpz90tlwK6o68yLMKJNcvv",
        children: [
          {
            title: "추천서 미리 보기",
            body: [
              {
                type: "image",
                source: DashboardJs.binaryPath + "/designerProposal12.jpg",
              },
              {
                type: "description",
                text: [
                  `Pr-r 콘솔에서 미리 보고 싶은 디자이너 추천서의 가장 우측에 있는 버튼을 클릭합니다. 주로 ‘완료’ 또는 ‘작성중’이라고 쓰여 있는 버튼입니다. 그러면 하단에 ‘미리보기’라는 버튼이 나타납니다. 해당 버튼을 클릭하면 고객이 보게 될 디자이너 추천서를 미리 확인할 수 있습니다. 이때, 자신이 조합한 사진 구성이 제대로 출력되는지, 설명이 제대로 쓰여져 있는지, 추천한 디자이너가 마감되지 않았는지, 매력적으로 잘 보이는지 등을 확인할 수 있습니다. 또한 미리 보기 추천서에는 각각의 영역마다 디자이너의 이름이 괄호 안에 적혀 있는데, 이는 홈리에종에서 미리보기로 볼 때만 표시되는 글자입니다. 따라서 고객이 볼 때에는 디자이너 명 없이 ‘추천 디자이너 A’까지만 나타납니다. 해당 디자이너 이름을 클릭하면, 디자이너에 대한 체크리스트가 팝업으로 열리며 해당 디자이너의 정보를 쉽게 조정할 수 있습니다. 하지만 이 기능 또한 홈리에종에서 미리보기로 볼 때에만 사용할 수 있는 기능으로, 고객은 ‘추천 디자이너 A’를 클릭해도 아무런 작업이 실행되지 않습니다.`,
                ]
              }
            ]
          },
          {
            title: "추천서 발송하기",
            body: [
              {
                type: "description",
                text: [
                  `추천서를 발송하는 방법은 간단합니다. 미리보기와 마찬가지로 발송하고자 하는 추천서의 우측에 있는 버튼을 누르면 하단에 ‘즉시 발송’ 버튼이 나타납니다. 해당 버튼을 눌러 고객님께 추천서를 발송하면 됩니다. 추천서를 발송하면 슬렉 알림에 추천서를 발송했다는 메시지와 함께 발송된 링크가 표시됩니다. 고객에게 발송되는 알림톡 문구는 다음과 같습니다.`,
                ]
              },
              {
                type: "block",
                text: [
                  `안녕하세요, 고객님! 디자이너 추천서 보내드립니다.`,
                  ``,
                  `고객님께서 기입해주신 정보 [주소, 일정, 서비스 유형 등] 를 기준으로 현재 시점에서 적합한 디자이너를 큐레이션하였습니다.`,
                  ``,
                  `영업일 기준 2일 이내로 홈리에종 담당자가 디자이너 추천서 리뷰를 위해 전화를 드릴 예정이오니 잠시만 기다려주세요 :)`,
                  ``,
                  `* 디자이너 추천서`,
                  `링크`,
                ]
              },
            ]
          },
        ]
      },
      {
        title: "추천서 피드백",
        children: [
          {
            title: "고객이 보는 추천서의 구성",
            body: [
              {
                type: "image",
                source: DashboardJs.binaryPath + "/designerProposal13.jpg",
              },
              {
                type: "description",
                text: [
                  `고객이 보는 디자이너 추천서의 구성은 다음과 같습니다. 먼저, 추천 서비스의 이름과 함께 예상 시작일과 종료일이 안내됩니다. 그 다음으로, 디자이너들에 대한 소개와 사진이 함께 나오며, 각 디자이너의 특성과 경력에 대한 설명이 이어집니다.`,
                ]
              },
              {
                type: "image",
                source: DashboardJs.binaryPath + "/designerProposal14.jpg",
              },
              {
                type: "image",
                source: DashboardJs.binaryPath + "/designerProposal15.jpg",
              },
              {
                type: "description",
                text: [
                  `각 디자이너에 대한 소개와 사진 아래에는 디자이너가 진행한 프로젝트의 포트폴리오와 고객 후기가 제공됩니다. 고객은 각 항목을 클릭하여 디자이너 포트폴리오를 쉽게 확인할 수 있습니다.`,
                ]
              },
              {
                type: "image",
                source: DashboardJs.binaryPath + "/designerProposal16.jpg",
              },
              {
                type: "image",
                source: DashboardJs.binaryPath + "/designerProposal17.jpg",
              },
              {
                type: "description",
                text: [
                  `이어서, 각 디자이너의 가격 정보가 제공되며, 모든 디자이너들이 소개된 이후에는 서비스에 대한 상세한 안내가 제공됩니다. 마지막으로, 고객은 디자이너를 선택하고 다음 단계로 넘어갈 수 있는 버튼을 클릭할 수 있습니다. 마지막 디자이너 선택과 버튼 클릭을 하게 되면 고객은 계약금 결제 페이지로 이동하게 됩니다.`,
                ]
              },
            ]
          },
          {
            title: "피드백 통화의 구성",
            body: [
              {
                type: "description",
                text: [
                  `고객님이 보신 디자이너 추천서에 대한 피드백 통화는 다음과 같이 이루어집니다. 먼저, 추천 서비스에 대한 설명과 예상 시작일 및 종료일을 안내한 후, 각 디자이너에 대한 어필을 하게 됩니다. 디자이너의 특성을 잘 파악하고 어필하는 것이 중요하며, 이를 위해 먼저 디자이너들에 대한 충분한 숙지가 필요합니다.`,
                ]
              },
              {
                type: "block",
                text: [
                  `1. 추천 서비스에 대한 설명`,
                  `2. 예상 시작일과 예상 종료일에 대한 안내`,
                  `3. 각 디자이너 특징 설명과 어필`,
                  `4. 디자이너 선택 방법 안내`,
                  `5. 홈리에종 프로세스 안내`,
                ]
              },
              {
                type: "description",
                text: [
                  `디자이너들에 대한 어필 후에는, 마지막 영역에 있는 디자이너 선택 버튼을 누르면 계약금 페이지로 이동하며, 계약금이 입금되면 현장 미팅이 진행된다는 프로세스를 설명합니다. 피드백 통화에서는 고객이 갈팡질팡하지 않도록 각 디자이너들을 강력하게 어필하고, 선택을 돕기 위해 어떤 디자이너를 우선적으로 추천할지 사전에 정해놓는 것이 좋습니다.`,
                ]
              },
            ]
          },
          {
            title: "디자이너 정보와 De 콘솔",
            body: [
              {
                type: "image",
                source: DashboardJs.binaryPath + "/designerProposal18.jpg",
              },
              {
                type: "image",
                source: DashboardJs.binaryPath + "/designerProposal19.jpg",
              },
              {
                type: "image",
                source: DashboardJs.binaryPath + "/designerProposal20.jpg",
              },
              {
                type: "description",
                text: [
                  `디자이너를 어필하기 위해서는 디자이너에 대한 충분한 이해가 필요하며, 현재 가능한 일정 상황에 대한 파악도 필요합니다. 이를 위해 De 콘솔을 활용할 수 있습니다. De 콘솔에 처음 접속하면 8개의 선택 창이 나타나며, 이 중 '디자이너 체크리스트'를 선택하면 디자이너에 대한 기본 정보가 정리된 페이지로 이동합니다. 디자이너 체크리스트를 통해 디자이너의 특성을 파악할 수 있으며, '일정 관리'를 선택하면 가능한 일정이 표시되는 팝업이 열립니다. De 콘솔을 통해 디자이너에 대한 기본 정보와 일정 상황을 충분히 파악한 후 고객님과 피드백 통화를 진행하는 것이 좋습니다.`,
                ]
              },
            ]
          },
        ]
      },
    ];
  } else if (key === "aboutService") {
    thisTitle = "기본적인 서비스 설명";
    baseContents = [
      {
        title: "홈리에종 서비스",
        children: [
          {
            title: "인테리어 시장 상황과 홈스타일링",
            body: [
              {
                type: "image",
                source: DashboardJs.binaryPath + "/aboutService1.jpg",
              },
              {
                type: "description",
                text: [
                  `주거 인테리어의 시장 상황은 크게 3가지 영역으로 나뉘어집니다: 집테리어, 리모델링, 아뜰리에입니다. 먼저 집테리어는 지역 내 작은 인테리어 가게들을 지칭합니다. 주로 집을 수리하는 것에 초점을 맞추어 디자인 폭이 정해져 있고, 기본적인 자재를 사용하여 시공을 진행합니다. 고객 취향에 맞추어 집을 제작하는 것보다는 주로 집 수리에 초점이 맞추어져 있습니다. 이러한 집테리어의 장점은 가격이 저렴하다는 것이지만, 단점으로는 디자인이 한정적이고 결과물이 좋지 않을 수 있으며, 고객 취향을 전혀 반영할 수 없다는 것입니다.`,
                ]
              },
              {
                type: "description",
                text: [
                  `두 번째로 언급된 리모델링은 한샘과 같은 대형 인테리어 회사를 떠올리시면 됩니다. 이들은 디자인도 하고 고급 자재도 사용하지만, 주로 스타일링은 진행하지 않고 시공만 진행합니다. 물론 추가 비용을 내면 스타일링까지 진행하는 경우도 있으나, 대체적으로 빈 집 상태에서 인테리어를 마무리합니다. 이러한 업체들은 고객이 실제로 어떻게 사는지는 별로 관심 없으며, 기본적인 바탕만 바꾸는 데에 초점이 맞추어져 있습니다. 따라서 비포 앤 에프터 사진은 화려하게 찍을 수 있겠지만, 고객이 집으로 들어올 때 가구와 소품, 패브릭 등의 조합이 맞지 않아 인테리어 디자인이 깨지는 경우가 많습니다. 리모델링의 장점으로는 빠르고 견적서를 먼저 제시할 수 있으며, 일반적인 경우에 대해서도 진행할 수 있다는 점 등이 있지만, 단점으로는 빈 집으로 끝나 인테리어의 완성을 하지 않는다는 점과 가격이 높다는 점 등이 있습니다.`,
                ]
              },
              {
                type: "description",
                text: [
                  `세 번째로 언급된 아뜰리에는 고급 인테리어 디자인 스튜디오와 같은 곳으로, 디자인, 시공, 스타일링까지 모두를 한 번에 제공합니다. 이들 중 대표적인 예시로 옐로우 플라스틱 등이 있습니다. 이들은 고객들의 예산이 기본적으로 억대일 경우에만 상대하며, 고급스러운 디자인과 완벽한 시공 및 스타일링을 제공하여 결과물은 매우 훌륭합니다. 하지만 가격이 매우 비싸고, 대부분의 일반 고객들은 상대 조차 해주지 않는다는 점이 치명적인 단점입니다.`,
                ]
              },
              {
                type: "description",
                text: [
                  `위 3가지 영역으로 나뉘어진 인테리어 시장에서 최근 떠오르는 트렌드는 '홈스타일링'입니다. 홈스타일링은 디자인을 먼저 진행하고, 그 디자인에 따라 시공을 진행한 뒤 스타일링으로 마무리하는 디자인 스튜디오들의 작업 구조를 적용하여 합리적인 부분 시공, 적당한 가격대의 가구, 소품, 패브릭으로 효율적인 예산 운영을 함께 하는 인테리어입니다. 홈스타일링은 디자이너가 필수적으로 참여하며, 일반 리모델링과 큰 차이점은 디자이너가 시공을 하기 전에 디자인을 먼저 진행한다는 점입니다. 또한, 상대적으로 저렴한 이케아 가구부터 고급 가구까지 고객의 예산에 맞게 폭넓은 운영을 한다는 점에서 아뜰리에와 구분됩니다. 이러한 트렌드가 인기를 얻는 이유는 말도 안 되는 가격과 예산 범위만 다루는 아뜰리에와 달리 합리적인 예산과 가구, 소품, 패브릭 등을 조합하여 고객의 취향과 예산에 맞게 디자인을 완성할 수 있다는 점 때문입니다.`,
                ]
              },
            ],
          },
          {
            title: "홈스타일링의 장점",
            body: [
              {
                type: "image",
                source: DashboardJs.binaryPath + "/aboutService2.jpg",
              },
              {
                type: "description",
                text: [
                  `홈스타일링은 다양한 장점을 가지고 있지만, 그 중에서도 대표적으로 3가지의 장점이 있습니다. 첫째로는 '인테리어의 제대로 된 완성'입니다. 인테리어는 바탕 시공만으로는 끝나지 않습니다. 바탕 시공을 어떻게 하는지는 시작에 불과하며, 이후에는 가구와 소품의 조합을 어떻게 할 지 컨셉을 정하고 구체적인 제품을 선택해야 합니다. 이러한 작업들을 통해 인테리어 디자인을 완성시키는 것이 원래의 인테리어 디자인의 작업입니다. 홈스타일링은 이러한 과정을 필수적으로 거치며, 디자인 컨셉과 제품 선택 등을 통해 주거 인테리어의 완성도를 높입니다. 이러한 점에서 리모델링과는 다른 장점을 가지고 있습니다.`,
                ]
              },
              {
                type: "description",
                text: [
                  `두 번째로는 합리적인 시공 진행입니다. 리모델링 회사들은 시공을 많이 하면 할수록 이익이 많이 남기 때문에 고객에게 쓸데없이 시공을 많이 시키고 강요하는 경우가 많습니다. 이러한 경우 고객은 불필요한 시공을 많이 하게 되면서 예산을 낭비하게 됩니다. 하지만 홈스타일링에서는 달라집니다. 디자이너는 시공을 얼마나 많이 하는 지에 상관 없이 똑같은 디자인비를 받게 되므로 시공을 무작정 많이 하는 것에 관심이 없습니다. 게다가 디자인을 기준으로 시공 범위를 정할 수 있기 때문에 어떤 시공이 진짜로 필요하고 어떤 시공이 필요없는지를 명확하게 구체적으로 정할 수 있습니다. 이러한 이유로 불필요한 시공을 방지할 수 있으며 고객은 쓸데없이 예산을 낭비하지 않을 수 있게 됩니다.`,
                ]
              },
              {
                type: "description",
                text: [
                  `세 번째로는 고객의 상황과 취향에 딱 맞는 커스터마이징 서비스라는 점입니다. 디자인을 선행하면서 예산에 대한 고려도 함께 이루어집니다. 주어진 예산 안에서 어떤 시공을 하고, 어떤 가격대에 있는 가구를 구매해야 가장 효과적인 결과를 얻을 수 있는지를 고민하고 실현합니다. 예산이 부족하다면 시공 범위를 줄이고 가구 브랜드의 급을 낮춰 보여지는 모습에 집중하고, 예산이 충분하다면 그에 맞는 브랜드의 가구를 추천합니다. 또한, 예산 뿐만 아니라 고객의 집 계약 상태, 가족 구성원, 평수 등 여러 조건을 모두 고려하여 최적의 디자인을 기획합니다. 이렇게 디자인 및 기획을 선행함으로써 고객 맞춤형 결과물을 얻을 수 있습니다. 리모델링과는 달리 시공만 무조건 시작하는 것이 아니라, 디자인과 기획을 통해 최적의 결과를 얻을 수 있는 큰 장점을 가지고 있습니다.`,
                ]
              },
            ],
          },
          {
            title: "디자이너와 함께 해야 하는 이유",
            body: [
              {
                type: "image",
                source: DashboardJs.binaryPath + "/aboutService3.jpg",
              },
              {
                type: "description",
                text: [
                  `홈스타일링에서는 디자이너가 필수적인 역할을 합니다. 디자이너의 디자인, 예산 계획, 공간 기획 등이 선행되고, 이후 시공과 구매가 따라오는 구조입니다. 즉, 디자이너가 전체적인 인테리어를 주도하는 역할을 합니다. 그렇다면, 디자인, 예산 계획, 공간 기획을 고객이 혼자서 할 수 없는 것일까요? 이 질문은 자연스러운 의문입니다. 하지만, 디자인비를 따로 내면서까지 전문가를 쓰는 이유는 다양하지만 대표적으로 다음 3가지가 있습니다.`,
                ]
              },
              {
                type: "description",
                text: [
                  `첫 번째로, 인테리어의 광범위한 범위입니다. 인테리어를 한 번이라도 경험해 보면 그 광범위함을 깨닫게 됩니다. 상상조차 못한 문제와 극도로 세세한 디테일이 많으며, 진행하는 동안 내내 고려해야 할 사항이 많아 끊임없이 처리해야 할 일이 발생합니다. 이렇게 생각해야 할 것이 너무 많기 때문에 전문가를 고용하는 것은 전혀 지나친 일이 아닙니다. 전문가와 함께하면 광범위한 업무량을 쉽게 처리할 수 있으며, 시간을 절약할 수 있기 때문에 디자이너와 함께하는 것입니다.`,
                ]
              },
              {
                type: "description",
                text: [
                  `두 번째로, 인테리어는 한번 실패하면 복구하기 힘든 점이 있습니다. 인테리어는 돈도 많이 들고 시간도 많이 드는 작업에다가 복구가 쉽지 않다는 특성까지 지니고 있습니다. 돈과 시간이 무한정하지 않은 이상, 이것저것 다 해보고 마음에 드는 것으로 바꿀 수 없으며, 실패하면 실패한대로 감수해야 합니다. 실제로 혼자서 고급스럽고 예쁜 집을 시도해보다가 생각하지도 못했던 문제에 가로막혀 실패하는 경우가 매우 많으며, 이러한 실패는 큰 돈과 시간을 소모했음에도 다시 되돌릴 수 없습니다. 그렇기 때문에 경험이 많은 전문가를 고용하여 실패의 확률을 크게 낮추는 것은 필수적인 과정입니다. 이러한 선택은 오히려 돈과 시간을 절약하는 전략적인 선택일 수 있습니다.`,
                ]
              },
              {
                type: "description",
                text: [
                  `세 번째로, 전문가와 함께하는 이유는 결과물에 대한 보증입니다. 디자이너는 단순히 감각이 좋은 사람이 아니라, 인테리어 디자인 분야에서 경력을 쌓은 전문가들입니다. 이들은 실제 현장을 다녀보고 구현해본 경험이 많으며, 주거 인테리어 시공 분야에 대한 경험이 풍부합니다. 또한, 가구와 소품 브랜드에 대한 깊은 지식을 갖고 있습니다. 주거 인테리어에 대한 경험치 자체가 다르기 때문에 어떤 컨셉으로 디자인을 진행하면 어떻게 구현될지 미리 예측할 수 있으며, 가상적으로 구현해 볼 수도 있습니다. 또한, 전문가는 도면과 3D에 대한 능력도 있어 현장 작업자들과 원활한 소통이 가능합니다. 따라서 전문가에게 맡기면 전문적인 지식과 경험, 감각 등이 더해져 월등히 좋은 결과물이 나오게 됩니다.`,
                ]
              },
            ],
          },
          {
            title: "홈리에종에서 해야 하는 이유",
            body: [
              {
                type: "image",
                source: DashboardJs.binaryPath + "/aboutService4.jpg",
              },
              {
                type: "description",
                text: [
                  `홈스타일링 디자이너와 함께하는 이유는 다양합니다. 홈리에종을 거치지 않고 디자이너와 직접적으로 연결하면 더 많은 비용을 절약할 수 있지 않을까 생각할 수 있겠지만, 그래도 홈리에종을 통해 디자이너를 만나야 하는 이유는 분명히 있습니다. 다음과 같은 이유가 있습니다.`,
                ]
              },
              {
                type: "description",
                text: [
                  `첫 번째로 안전한 프로젝트 운영입니다. 디자이너와 직접적으로 연결하여 작업을 진행하는 경우, 문제가 발생할 때 중재해줄 제3자가 없어 리스크가 큽니다. 문제가 발생하여 해결이 되지 않으면 연락이 끊길 수 있고, 책임을 회피하느라 프로젝트가 올바르게 마무리되지 않을 수 있습니다. 특히 인테리어 분야는 예측할 수 없는 문제가 매우 빈번하게 발생하며, 피해 금액도 크기 때문에 리스크 관리가 매우 중요합니다. 디자이너 또는 작업자와 직접 연락을 취하여 중재할 제3자를 끼지 않는 것은 상당히 위험합니다. 인테리어 분야에서는 꼭 회사나 플랫폼을 끼고 프로젝트를 진행하는 것이 안전하고 올바른 선택입니다.`,
                ]
              },
              {
                type: "description",
                text: [
                  `두 번째로 홈리에종에는 검증된 디자이너들만 모였다는 점 때문입니다. 프리랜서 디자이너는 수많이 존재하지만, 그들의 실력과 작업 방식을 정확히 평가하기는 어렵습니다. 또한 인테리어 업계에서는 표준화가 잘 이루어지지 않아, 작업 방식이 다양하고 품질이 일정하지 않을 수 있습니다. 그러나 홈리에종의 디자이너들은 검증 과정을 거쳐 선발된 전문가들로 구성되어 있으며, 홈리에종의 표준에 맞춰 작업을 수행합니다. 또한 결과물에 대한 보증 및 포트폴리오 검증도 철저히 이루어지므로, 홈리에종의 디자이너라면 믿고 인테리어를 맡길 수 있는 것입니다. `,
                ]
              },
              {
                type: "description",
                text: [
                  `세 번째로 홈리에종의 큐레이션이 있기 때문입니다. 인테리어를 디자이너와 진행하려면, 수많은 디자이너들 중에서 내 취향과 조건에 부합하는 디자이너를 찾아야 합니다. 하지만 내가 원하는 디자이너가 있더라도 예산, 일정, 거리 등 다양한 요인들을 고려해야 하기 때문에 선택 과정은 복잡하고 어렵습니다. 홈리에종의 큐레이션 서비스는 이러한 문제를 해결해줍니다. 고객 상담을 통해 고객님의 기본 정보와 여러 조건들을 체계적으로 분석하여, 최적의 인테리어 디자이너 3~4명을 추천해줍니다. 이를 통해 고객님은 어떤 디자이너가 가장 적합한지를 쉽게 확인할 수 있으며, 예산, 일정, 거리 등 다양한 요인들도 모두 고려된 맞춤형 추천을 받을 수 있습니다. 홈리에종과 함께하면 디자이너를 찾기 위해 복잡하고 긴 시간을 들일 필요 없이, 쉽고 빠르게 디자이너를 추천받고 선택할 수 있습니다.`,
                ]
              },
              {
                type: "description",
                text: [
                  `네 번째로 홈리에종의 프로젝트 케어가 있기 때문입니다. 인테리어 프로젝트를 진행하는 동안 디자이너와 고객만 소통하는 것이 아니라, 홈리에종은 중재 역할을 하며 문제가 발생하면 적극적으로 해결해줍니다. 만약 디자이너와 맞지 않는 경우, 다른 디자이너로 교체하는 것도 가능합니다. 프로젝트의 각 중요 단계에서 홈리에종은 고객과 디자이너에게 전화를 걸어 문제 없이 진행되고 있는지 확인하며, 현장을 사진으로 확인하여 프로젝트가 원활하게 마무리될 수 있도록 합니다. 또한, 세팅과 촬영까지 진행하게 하여 최종 결과물을 확실하게 만들어드립니다. 고객님은 프로젝트가 중간에 흐지부지 끝나거나 제대로 마무리되지 않을까 하는 걱정 없이, 프로젝트가 완성도 높게 끝나길 기다리기만 하시면 됩니다.`,
                ]
              },
            ],
          },
          {
            title: "홈리에종 프로세스 설명",
            body: [
              {
                type: "description",
                text: [
                  `1차 응대가 이루어지면 홈리에종은 고객님께 디자이너 추천서를 보내며, 고객님이 추천서에서 디자이너를 선택하신 후, 계약금(33만원)을 결제하시면 디자인 계약이 체결됩니다. 그리고 홈리에종은 디자이너에게 연락하여 고객님과의 현장 미팅 일자를 조율합니다. 현장 미팅 이후에는 고객님께 다시 전화하여 진행 여부를 확인하며, 고객님이 계속 진행하겠다고 하시면 홈스타일링 계약서를 작성하고 잔금을 안내합니다. 고객님께서 잔금을 지불하시고 계약서에 서명을 완료하면 홈스타일링 프로젝트가 본격적으로 시작되며 디자이너가 디자인 작업을 시작합니다. 인테리어 과정이 끝나면 홈리에종은 현장 확인과 함께 현장 촬영을 진행하고, 촬영이 끝나면 컨텐츠 발행과 최종 마무리를 합니다.`,
                ]
              },
            ],
          },
          {
            title: "서비스 종류와 용어 정의",
            body: [
              {
                type: "description",
                text: [
                  `홈리에종의 서비스 종류는 다음 4가지로 구분됩니다.`,
                ]
              },
              {
                type: "block",
                text: [
                  `홈퍼니싱, 홈스타일링, 토탈 스타일링, 엑스트라 스타일링`,
                ]
              },
              {
                type: "description",
                text: [
                  `홈리에종 서비스 설명에 앞서 인테리어 시공과 디자인에 대한 이해가 필요합니다. 인테리어 시공은 시공 작업자가 직접 현장에 와서 집을 수리하는 등의 실제 작업을 말합니다. 이는 철거부터 시작해서 도배, 장판, 마루, 타일 시공, 중문 설치, 조명 설치, 샤시 교체 등 모든 작업을 포함합니다. 핵심적인 기준은 '전문 시공 작업자'가 현장에 오는지 여부입니다.`,
                ]
              },
              {
                type: "description",
                text: [
                  `홈리에종의 서비스는 시공 범위에 따라 구분됩니다. 홈퍼니싱은 시공이 전혀 필요 없는 서비스이며, 홈스타일링과 토탈 스타일링은 다음 표와 같이 구분됩니다. 엑스트라 스타일링은 토탈 스타일링의 프리미엄 버전으로, '설계 변경'이라고도 불리며, 시공 디자인이 필요한지 여부에 따라 토탈과 구분됩니다. 아래는 서비스 종류와 그에 따른 시공 범위를 보여주는 표입니다.`,
                ]
              },
              {
                type: "table",
                matrix: [
                  [ `구분` , `홈퍼니싱`, `홈스타일링`, `토탈 스타일링`, `엑스트라 스타일링` ],
                  [ `철거`, `제공 없음`, `부분 철거`, `전체 철거`, `전체 철거` ],
                  [ `보양`, `제공 없음`, `해당 면적`, `해당 면적`, `해당 면적` ],
                  [ `목공`, `제공 없음`, `걸레받이 / 몰딩 / 문짝`, `모든 종류의 목공`, `모든 종류의 목공` ],
                  [ `전기`, `제공 없음`, `일부 배선 및 조명 교체`, `전체 배선 및 조명 교체`, `전체 배선 및 조명 교체` ],
                  [ `타일`, `제공 없음`, `덧방 위주`, `전체 철거 및 교체`, `전체 철거 및 교체` ],
                  [ `바닥`, `제공 없음`, `마루 / 장판`, `마루 / 장판 / 타일`, `마루 / 장판 / 타일` ],
                  [ `욕실`, `제공 없음`, `악세사리 교체`, `기본 철거 및 전체 공사`, `기본 철거 및 전체 공사` ],
                  [ `주방`, `제공 없음`, `악세사리 교체`, `전체 철거 및 전체 공사`, `전체 철거 및 전체 공사` ],
                  [ `필름`, `제공 없음`, `전체 제공`, `전체 제공`, `전체 제공` ],
                  [ `도배`, `제공 없음`, `전체 제공`, `전체 제공`, `전체 제공` ],
                  [ `중문`, `제공 없음`, `중문 교체`, `중문 교체`, `중문 교체` ],
                  [ `가구`, `제공 없음`, `붙박이장 / 냉장고장`, `모든 종류의 제작 가구`, `모든 종류의 제작 가구` ],
                  [ `발코니`, `제공 없음`, `제공 없음`, `발코니 확장`, `발코니 확장` ],
                  [ `기타`, `제공 없음`, `제공 없음`, `금속, 샤시 등`, `금속, 샤시 등` ],
                ]
              },
              {
                type: "description",
                text: [
                  `가구, 소품, 패브릭 등의 스타일링을 위한 디자인 작업은 모든 서비스에서 필수적으로 이루어집니다. 홈퍼니싱 서비스는 시공 없이 스타일링만 진행하는 서비스이지만, 그 반대인 스타일링 없이 시공만 진행하는 서비스는 제공하지 않습니다. 따라서 시공만 원하는 고객분들에게는 최대한 스타일링을 함께 하는 것이 좋다는 점을 어필하여 홈리에종 서비스를 받게 하는 것이 필요합니다.`,
                ]
              },
            ],
          },
          {
            title: "예산과 기간에 대한 설명",
            body: [
              {
                type: "description",
                text: [
                  `홈리에종이 설명하는 인테리어 예산은 세 가지로 나누어집니다. 시공 예산, 가구 구매 예산, 디자인비로 구성됩니다. 시공 예산은 시공에 쓰이는 비용을 의미하며, 가구 구매 예산은 가구, 소품, 패브릭 등 구매에 필요한 비용을 의미합니다. 디자인비는 디자이너에게 지불하는 비용으로, 인테리어 프로젝트가 시작하기 전에 홈리에종에 미리 지불하게 됩니다.`,
                ]
              },
              {
                type: "description",
                text: [
                  `프로젝트에 소요되는 시간은 서비스 종류에 따라 다릅니다. 또한, 배송 상황에 따라 유동적으로 변할 수 있기 때문에 정확한 기간을 정의하기는 어렵습니다. 그러나 대략적인 평균 소요기간은 예측할 수 있습니다. 다음은 서비스별 예상 소요기간입니다.`,
                ]
              },
              {
                type: "block",
                text: [
                  `1. 홈퍼니싱 : 30일 소요`,
                  `2. 홈스타일링 : 45일 소요`,
                  `3. 토탈 스타일링 : 60일 소요`,
                  `4. 엑스트라 스타일링 : 60일 소요`,
                ]
              },
            ],
          },
          {
            title: "디자이너의 제공물",
            body: [
              {
                type: "description",
                text: [
                  `디자이너의 기본 작업물은 다음과 같습니다. 일정표, 시공 의뢰서, 컨셉 제안서, 디자인 제안서, 배치도(도면), 콜라쥬, 3D 모델, 제품 리스트입니다. 이 중 시공 의뢰서와 디자인 제안서, 배치도, 그리고 제품 리스트는 필수적으로 제공되며, 나머지는 디자이너마다 제공될 수도 있고 안 될 수도 있습니다. 특히 3D 모델링과 같은 경우는 노가다 작업이 크기 때문에 일부 디자이너는 별도의 요금을 받거나 제공하지 않을 수도 있습니다.`,
                ]
              },
              {
                type: "description",
                text: [
                  `디자이너가 제공하는 작업물은 고객과의 소통을 원활하게 하기 위한 것이며, ‘디자인’ 자체가 아닙니다. 디자이너가 작업물만 너무 몰두되어 있다보면 현장의 문제를 해결하지 못하는 경우가 있을 수 있습니다. 결국 가장 중요한 것은 최종 결과물인 '현장'이기 때문에, 디자이너가 디자인 작업물에만 집중하면서 현장에 대한 고민을 줄이는 것보다는 좋은 현장이 만드는 데에 더 많은 시간을 쏟아야 합니다. 작업물만 화려하고, 최종 결과물이 실제로 잘 나오지 않는 경우를 피하는 것이 중요합니다.`,
                ]
              },
            ],
          },

          {
            title: "시공사 선택권",
            body: [
              {
                type: "description",
                text: [
                  `일반 리모델링 회사와는 달리 홈리에종은 플랫폼으로서, 디자이너를 중심으로 한 홈스타일링 운영 체제입니다. 이러한 특성 때문에 시공 과정에서 고객이 선택권을 가질 수 있습니다. 디자이너가 진행한 디자인을 그대로 시공해줄 회사를 외부에서 찾아 시공을 진행할 수 있는 것입니다. 고객의 시공사 선택권은 홈리에종 시공사, 디자이너 시공사, 외부 시공사로 구분됩니다. 홈리에종 시공사는 홈리에종과 파트너십 계약을 맺은 시공사가 시공을 진행하는 것을 의미하며, 디자이너 시공사는 디자이너와 긴밀한 관계를 갖고 있거나 소속되어 있는 시공사와 시공을 진행하는 것을 말합니다. 외부 시공사는 홈리에종 파트너십이나 디자이너와의 관계가 없는 외부 턴키 업체를 의미합니다. 홈리에종은 공정별로 시공을 진행하길 원하는 고객의 선택을 허용하지 않습니다. 따라서 고객은 홈리에종, 디자이너, 외부 턴키 업체 중에서 하나를 선택하여 시공을 진행할 수 있습니다.`,
                ]
              },
            ],
          },
        ]
      },
      {
        title: "홈리에종 구조",
        video: "1nVEVDDal7wsXUp0E8cRSkYP6GgA4ftDF",
        children: []
      },
    ]
  }

  return { title: thisTitle, contents: baseContents };
}

DashboardJs.prototype.baseMaker = function () {
  const instance = this;
  const { ea, vh, totalContents, belowHeight, grayBarWidth } = this;
  const { createNode, colorChip, withOut, equalJson, cleanChildren } = GeneralJs;
  let totalMother;
  let outerMargin;
  let innerPadding;
  let contentsBase;
  let baseContents;
  let maxLength;
  let getLength;
  let xLength, yLength;
  let titleArea, contentsArea;
  let titleAreaHeight;
  let targetChildren;
  let indent;
  let makeChildren;
  let contentsSize;
  let titleSize;
  let indentMargin;
  let lineTop;
  let visualMarginLeft;
  let visualFirstTopHeight;
  let maxWidthLength;
  let numberMargin;
  let numberTitleMargin;
  let numberTitleTop;
  let numberTitleSize;
  let grayBase;
  let baseLoad;

  outerMargin = 30;
  innerPadding = 40;

  titleAreaHeight = 6.5;
  indent = 40;
  indentMargin = 12;

  titleSize = 2.6;
  contentsSize = 1.6;
  lineTop = 1;

  visualMarginLeft = 4;
  visualFirstTopHeight = 1.2;

  maxWidthLength = 1000;

  numberMargin = 0.6;
  numberTitleMargin = 0.7;
  numberTitleTop = 1.3;
  numberTitleSize = 1.6;

  baseContents = this.returnTreeContents();

  getLength = (children) => {
    let length;
    length = 0;
    for (let obj of children) {
      length = length + 1;
      if (Array.isArray(obj.children)) {
        length += getLength(obj.children);
      }
    }
    return length;
  }
  maxLength = baseContents.reduce((acc, curr) => {
    return acc > getLength(curr.children) ? acc : getLength(curr.children);
  }, 0);

  xLength = baseContents.length;
  yLength = maxLength;
  contentsArea = {};

  makeChildren = (x, targetChildren, level = 0, still = false, originalNumber = 300) => {
    let num;
    let last;
    let middleFirst;
    let thisNumber;
    let thisDeactive;

    last = (level !== 0 && !still);
    num = 0;
    for (let obj of targetChildren) {
      thisNumber = level === 0 ? baseContents[x].number + (10 * (num + 1)) : originalNumber + (10 * (x + 1)) + (num + 1);
      middleFirst = (level !== 0 && num == 0);
      thisDeactive = (typeof obj.event !== "function" && !Array.isArray(obj.children));
      createNode({
        mother: contentsArea,
        style: {
          display: "flex",
          position: "relative",
          flexDirection: "row",
          width: withOut(0, ea),
          height: "calc(100% / " + String(yLength) + ")",
        },
        children: [
          {
            style: {
              display: "inline-flex",
              position: "relative",
              marginLeft: String(visualMarginLeft) + ea,
              width: String((indent * (level + 1)) - visualMarginLeft) + ea,
              height: withOut(0, ea),
              marginRight: String(indentMargin) + ea,
              flexDirection: "column",
              borderLeft: (num !== targetChildren.length - 1 || still) ? (last ? "" : "1px solid " + colorChip.gray3) : "",
              boxSizing: "border-box",
            },
            child: {
              style: {
                display: "block",
                position: "relative",
                width: String(indent) + ea,
                borderLeft: (level !== 0) ? ((num === targetChildren.length - 1) ? "" : "1px solid " + colorChip.gray3) : "",
                marginLeft: String((indent + indentMargin) * level) + ea,
                height: withOut(0, ea),
                boxSizing: "border-box",
              },
              children: [
                {
                  style: {
                    display: "block",
                    position: "absolute",
                    width: withOut(indentMargin * level, ea),
                    height: String(visualFirstTopHeight) + vh,
                    top: String(-1 * visualFirstTopHeight) + vh,
                    left: String(-1 * 1) + ea,
                    boxSizing: "border-box",
                    borderLeft: middleFirst ? "1px solid " + colorChip.gray3 : "",
                  }
                },
                {
                  style: {
                    display: "block",
                    position: "relative",
                    width: withOut(indentMargin * level, ea),
                    height: String(lineTop) + vh,
                    boxSizing: "border-box",
                    borderBottom: "1px solid " + colorChip.gray3,
                    borderLeft: (num !== targetChildren.length - 1) ? "" : "1px solid " + colorChip.gray3,
                    borderBottomLeftRadius: (num !== targetChildren.length - 1) ? "" : String(3) + ea,
                  }
                }
              ],
            }
          },
          {
            style: {
              display: "inline-block",
              position: "relative",
              width: withOut((indent * (level + 1)) + indentMargin, ea),
              overflow: "hidden",
            },
            child: {
              event: {
                selectstart: (e) => { e.preventDefault() },
              },
              style: {
                display: "inline-flex",
                position: "relative",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "start",
                width: String(maxWidthLength) + ea,
              },
              children: [
                {
                  text: String(thisNumber),
                  event: {
                    selectstart: (e) => { e.preventDefault() },
                  },
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(contentsSize) + vh,
                    fontWeight: String(200),
                    color: colorChip.gray3,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    marginRight: String(numberMargin) + vh,
                  }
                },
                {
                  text: obj.title,
                  attribute: {
                    deactive: thisDeactive ? "true" : "false",
                  },
                  event: {
                    mouseenter: function (e) {
                      const deactive = this.getAttribute("deactive") === "true";
                      if (!deactive) {
                        this.style.color = colorChip.green;
                      }
                    },
                    mouseleave: function (e) {
                      const deactive = this.getAttribute("deactive") === "true";
                      this.style.color = deactive ? colorChip.gray3 : colorChip.black;
                    },
                    selectstart: (e) => { e.preventDefault() },
                    click: (typeof obj.event === "function" ? obj.event() : (e) => {}),
                  },
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(contentsSize) + vh,
                    fontWeight: String(700 - (300 * level)),
                    color: thisDeactive ? colorChip.gray3 : colorChip.black,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }
                },
              ],
            },
          },
        ]
      });
      if (Array.isArray(obj.children)) {
        makeChildren(num, obj.children, level + 1, num !== targetChildren.length - 1, baseContents[x].number);
      }
      num++;
    }
  }

  totalMother = createNode({
    mother: totalContents,
    class: [ "totalMother" ],
    style: {
      display: "flex",
      width: withOut(0, ea),
      height: "calc(100% - " + String(belowHeight) + ea + ")",
      background: colorChip.white,
      flexDirection: "row",
    }
  });

  this.totalMother = totalMother;

  grayBase = createNode({
    mother: totalMother,
    style: {
      display: "inline-flex",
      width: String(grayBarWidth) + ea,
      height: withOut(0, ea),
      background: colorChip.gray0,
    }
  });
  this.grayBase = grayBase;

  contentsBase = createNode({
    mother: totalMother,
    style: {
      display: "inline-flex",
      position: "relative",
      padding: String(outerMargin) + ea,
      width: withOut(grayBarWidth + (outerMargin * 2), ea),
      height: withOut(outerMargin * 2, ea),
      background: colorChip.white,
      flexDirection: "row",
    }
  });
  this.contentsBase = contentsBase;

  baseLoad = () => {
    window.history.pushState({ path: "init", status: "" }, '');
    cleanChildren(contentsBase);
    for (let i = 0; i < xLength; i++) {
      [ titleArea, contentsArea ] = createNode({
        mother: contentsBase,
        style: {
          display: "inline-flex",
          position: "relative",
          flexDirection: "column",
          width: "calc(100% / " + String(xLength) + ")",
          height: withOut(0, ea),
          boxSizing: "border-box",
          padding: String(innerPadding) + ea,
        },
        children: [
          {
            style: {
              display: "flex",
              position: "relative",
              width: withOut(0, ea),
              height: String(titleAreaHeight) + vh,
              justifyContent: "start",
              alignItems: "start",
              flexDirection: "row",
            },
            children: [
              {
                text: baseContents[i].title,
                event: {
                  selectstart: (e) => { e.preventDefault() },
                },
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(titleSize) + vh,
                  fontWeight: String(900),
                  color: colorChip.black,
                }
              },
              {
                text: String(baseContents[i].number),
                event: {
                  selectstart: (e) => { e.preventDefault() },
                },
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(numberTitleSize) + vh,
                  fontWeight: String(200),
                  color: colorChip.green,
                  marginLeft: String(numberTitleMargin) + vh,
                  top: String(numberTitleTop) + vh,
                }
              },
            ],
          },
          {
            style: {
              display: "flex",
              flexDirection: "column",
              position: "relative",
              width: withOut(0, ea),
              height: withOut(titleAreaHeight, vh),
            }
          }
        ]
      }).children;
      makeChildren(i, baseContents[i].children, 0);
    }
  }
  this.baseLoad = baseLoad;

  baseLoad();

}

DashboardJs.prototype.grayMaker = function () {
  const instance = this;
  const { grayBase, ea, vh, members } = this;
  const { createNode, withOut, colorChip, equalJson, blankHref, svgMaker } = GeneralJs;
  let innerPadding;
  let fontSize;
  let numberBoxWidth;
  let blockBetween;
  let contentsTong;
  let thisMenu;
  let arrowHeight;

  innerPadding = 38;
  fontSize = 14;
  numberBoxWidth = 20;
  blockBetween = 10;
  arrowHeight = 7;

  thisMenu = [
    {
      title: "홈리에종 문서",
      event: () => {
        return function (e) {
          instance.whiteEntireMaker(window.location.protocol + "//" + window.location.host + "/file?mode=document&entire=true&dataonly=true");
        }
      }
    },
    {
      title: "홈리에종 파일",
      event: () => {
        return function (e) {
          instance.whiteEntireMaker(window.location.protocol + "//" + window.location.host + "/file?mode=file&entire=true&dataonly=true");
        }
      }
    },
    {
      title: "홈리에종 웹",
      event: () => {
        return function (e) {
          blankHref(FRONTHOST);
        }
      }
    },
  ]

  contentsTong = createNode({
    mother: grayBase,
    style: {
      display: "flex",
      position: "relative",
      top: String(innerPadding) + ea,
      left: String(innerPadding) + ea,
      width: withOut(innerPadding * 2, ea),
      height: withOut(innerPadding * 2, ea),
      overflow: "scroll",
    },
    child: {
      style: {
        display: "block",
        position: "relative",
        width: withOut(0, ea),
      }
    }
  }).firstChild;

  for (let obj of thisMenu) {
    
    createNode({
      mother: contentsTong,
      event: obj.event(),
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "center",
        marginBottom: String(blockBetween) + ea,
        cursor: "pointer",
      },
      children: [
        {
          text: obj.title,
          style: {
            display: "inline-block",
            verticalAlign: "top",
            position: "relative",
            width: withOut(numberBoxWidth, ea),
            fontSize: String(fontSize) + ea,
            fontWeight: String(600),
            color: colorChip.black,
            transition: "all 0.3s ease",
          }
        },
        {
          style: {
            display: "inline-flex",
            verticalAlign: "top",
            overflow: "hidden",
            position: "relative",
            width: String(numberBoxWidth) + ea,
            height: withOut(0, ea),
            textAlign: "right",
            justifyContent: "end",
            alignItems: "center",
          },
          child: {
            mode: "svg",
            source: svgMaker.horizontalArrow(numberBoxWidth, arrowHeight, colorChip.deactive),
            style: {
              position: "relative",
              display: "inline-block",
              width: String(numberBoxWidth) + ea,
            }
          }
        }
      ]
    });

  }


  createNode({
    mother: contentsTong,
    style: {
      display: "flex",
      position: "absolute",
      width: withOut(0, ea),
      bottom: String(0) + ea,
      left: String(0) + ea,
      flexDirection: "column",
      justifyContent: "start",
      alignItems: "start",
      cursor: "pointer",
    },
    children: [
      {
        class: [ "hoverDefault_lite" ],
        event: {
          click: (e) => {
            blankHref("https://instagram.com/homeliaison");
          }
        },
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          flexDirection: "row",
          justifyContent: "start",
          alignItems: "start",
          cursor: "pointer",
          marginBottom: String(blockBetween) + ea,
        },
        child: {
          text: "홈리에종 인스타그램",
          style: {
            display: "inline-block",
            position: "relative",
            width: withOut(0, ea),
            fontSize: String(fontSize) + ea,
            fontWeight: String(600),
            color: colorChip.black,
            transition: "all 0.3s ease",
          }
        }
      },
      {
        class: [ "hoverDefault_lite" ],
        event: {
          click: (e) => {
            blankHref("https://blog.naver.com/homeliaison");
          }
        },
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          flexDirection: "row",
          justifyContent: "start",
          alignItems: "start",
          cursor: "pointer",
          marginBottom: String(blockBetween) + ea,
        },
        child: {
          text: "홈리에종 네이버 블로그",
          style: {
            display: "inline-block",
            position: "relative",
            width: withOut(0, ea),
            fontSize: String(fontSize) + ea,
            fontWeight: String(600),
            color: colorChip.black,
            transition: "all 0.3s ease",
          }
        }
      },
      {
        class: [ "hoverDefault_lite" ],
        event: {
          click: (e) => {
            blankHref("https://drive.google.com/drive/folders/0B7youNEnMPEfQjBNZldFZXVlVTg?usp=sharing");
          }
        },
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          flexDirection: "row",
          justifyContent: "start",
          alignItems: "start",
          cursor: "pointer",
        },
        child: {
          text: "홈리에종 구글 드라이브",
          style: {
            display: "inline-block",
            position: "relative",
            width: withOut(0, ea),
            fontSize: String(fontSize) + ea,
            fontWeight: String(600),
            color: colorChip.black,
            transition: "all 0.3s ease",
          }
        }
      },
    ]
  });


}

DashboardJs.prototype.manualMaker = function (key) {
  const instance = this;
  const { ea, vh, totalContents, belowHeight, grayBarWidth, contentsBase } = this;
  const { createNode, colorChip, withOut, equalJson, cleanChildren, findByAttribute, scrollTo } = GeneralJs;
  const tap = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  const titleClassName = "titleContentsInnerClassName";
  let thisContents;
  let grayBase;
  let innerPadding;
  let whiteMargin;
  let contentsTong;
  let title, contents;
  let startPaddingTop;
  let contextWidth;
  let num, num2;
  let properWidth;
  let motherPadding;
  let basicMargin;
  let wideMargin;
  let bigWideMargin;
  let boxBetween;
  let contextContents;
  let contextSize;
  let paraMarginBottom;
  let paraStart, paraEnd;
  let contextEvent;
  let x, y;
  let basicSize;
  let middleTitleSize;
  let bigTitleSize;
  let blockSize;
  let blockLeftPadding, blockTopPadding;
  let titleBarMarginTop;
  let circleRadius;
  let returnIconWidth;
  let videoHeight;
  let tempTable;
  let tableVisualMargin;

  window.history.pushState({ path: "manual", status: key }, '');

  motherPadding = 30;
  innerPadding = 0;
  boxBetween = 10;
  properWidth = 800;
  contextWidth = 320;
  whiteMargin = (window.innerWidth - ((motherPadding * 2) + (innerPadding * 2) + boxBetween + contextWidth + grayBarWidth) - properWidth) / 2;
  startPaddingTop = 80;
  basicMargin = 28;
  wideMargin = 60;
  bigWideMargin = 120;
  contextSize = 14;
  paraMarginBottom = 6;
  basicSize = 15;
  middleTitleSize = 20;
  bigTitleSize = 30;
  blockSize = 14;
  blockLeftPadding = 25;
  blockTopPadding = 20;
  titleBarMarginTop = 16;
  circleRadius = 36;
  returnIconWidth = 23;
  videoHeight = 441;
  tableVisualMargin = 8;

  cleanChildren(contentsBase);

  ({ title, contents } = this.returnManualContents(key));

  contentsTong = {};

  paraStart = (x, y) => ("<p x=\"" + String(x) + "\" y=\"" + String(y) + "\" style=\"font-size:inherit;font-weight:inherit;color:inherit;margin-bottom:" + String(paraMarginBottom) + ea + "\">");
  paraEnd = () => "</p>";

  contextContents = title;
  contextContents += "\n\n";
  x = 0;
  for (let obj of contents) {
    contextContents += paraStart(x, -1) + obj.title + paraEnd();
    y = 0;
    for (let obj2 of obj.children) {
      contextContents += paraStart(x, y) + tap + "<b%" + obj2.title + "%b>" + paraEnd();
      y++;
    }
    contextContents += "\n";
    x++;
  }

  contextEvent = (e) => {
    let thisTarget;
    let x, y;
    let titleDoms;
    let targetDom;
    if (/^b/gi.test(e.target.nodeName)) {
      thisTarget = e.target.parentNode;
    } else if (/^p/gi.test(e.target.nodeName)) {
      thisTarget = e.target;
    } else {
      thisTarget = null;
    }
    if (thisTarget !== null) {
      x = Number(thisTarget.getAttribute('x'));
      y = Number(thisTarget.getAttribute('y'));

      targetDom = null;
      titleDoms = document.querySelectorAll('.' + titleClassName);
      for (let dom of titleDoms) {
        if (Number(dom.getAttribute('x')) === x && Number(dom.getAttribute('y')) === y) {
          targetDom = dom;
          break;
        }
      }
      scrollTo(contentsTong.parentNode, targetDom, 60);
    }
  }

  grayBase = createNode({
    mother: contentsBase,
    style: {
      display: "flex",
      position: "relative",
      borderRadius: String(5) + "px",
      background: colorChip.white,
      width: withOut(0, ea),
      height: withOut(0, ea),
      justifyContent: "start",
      alignItems: "start",
      flexDirection: "row",
    }
  });

  createNode({
    mother: grayBase,
    style: {
      display: "inline-flex",
      position: "relative",
      flexDirection: "column",
      justifyContent: "start",
      alignItems: "start",
      width: String(contextWidth) + ea,
      height: withOut(0, ea),
      marginRight: String(boxBetween) + ea,
    },
    children: [
      {
        style: {
          display: "block",
          position: "relative",
          width: withOut(motherPadding * 2, ea),
          height: withOut(motherPadding * 2, ea),
          borderRadius: String(5) + "px",
          border: "1px solid " + colorChip.gray3,
          padding: String(motherPadding) + ea,
          overflow: "scroll",
        },
        child: {
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
          },
          child: {
            event: {
              click: contextEvent,
            },
            text: contextContents,
            style: {
              position: "relative",
              fontSize: String(contextSize) + ea,
              fontWeight: String(700),
              color: colorChip.black,
              cursor: "pointer",
            },
            bold: {
              fontSize: String(contextSize) + ea,
              fontWeight: String(400),
              color: colorChip.black,
            }
          }
        }
      },
      {
        event: (e) => {
          instance.baseLoad();
        },
        style: {
          display: "inline-flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: String(motherPadding) + ea,
          right: String(motherPadding) + ea,
          width: String(circleRadius) + ea,
          height: String(circleRadius) + ea,
          borderRadius: String(circleRadius) + ea,
          background: colorChip.gradientGray,
          cursor: "pointer",
        },
        child: {
          mode: "svg",
          source: instance.mother.returnReturn(colorChip.white),
          style: {
            position: "relative",
            top: String(1) + ea,
            width: String(returnIconWidth) + ea,
          }
        }
      }
    ]
  });

  contentsTong = createNode({
    mother: grayBase,
    style: {
      display: "inline-block",
      position: "relative",
      paddingTop: String(startPaddingTop) + ea,
      paddingLeft: String(whiteMargin) + ea,
      paddingRight: String(whiteMargin) + ea,
      width: withOut((innerPadding * 2) + boxBetween + (whiteMargin * 2) + contextWidth, ea),
      height: withOut((innerPadding * 2) + startPaddingTop, ea),
      background: colorChip.white,
      borderRadius: String(5) + "px",
      border: "1px solid " + colorChip.gray3,
      overflow: "scroll",
    },
    child: {
      style: {
        display: "flex",
        position: "relative",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "start",
        width: withOut(0, ea),
        paddingBottom: String(800) + ea,
      }
    }
  }).firstChild;

  createNode({
    mother: contentsTong,
    style: {
      display: "flex",
      position: "relative",
      width: withOut(0, ea),
      justifyContent: "start",
      alignItems: "start",
    },
    child: {
      text: title,
      style: {
        fontSize: String(bigTitleSize) + ea,
        fontWeight: String(800),
        color: colorChip.black,
      }
    }
  });

  createNode({
    mother: contentsTong,
    style: {
      display: "flex",
      position: "relative",
      width: withOut(0, ea),
      justifyContent: "start",
      alignItems: "start",
      height: String(titleBarMarginTop) + ea,
      borderBottom: "1px solid " + colorChip.gray3,
    },
  });


  num = 0;
  for (let obj of contents) {
    createNode({
      mother: contentsTong,
      class: [ titleClassName ],
      attribute: {
        x: String(num),
        y: String(-1),
      },
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "start",
        alignItems: "start",
        marginTop: String(bigWideMargin) + ea,
      },
      child: {
        text: String(num + 1) + ". " + obj.title,
        style: {
          fontSize: String(middleTitleSize) + ea,
          fontWeight: String(700),
          color: colorChip.black,
        }
      }
    });


    if (typeof obj.video === "string") {
      createNode({
        mother: contentsTong,
        attribute: {
          x: String(num),
          y: String(-1),
        },
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          justifyContent: "start",
          alignItems: "start",
          marginTop: String(basicMargin) + ea,
        },
        child: {
          text: `<iframe src="https://drive.google.com/file/d/${obj.video}/preview" width="100%" height="${String(videoHeight) + ea}" style="border:0px;" allow="autoplay"></iframe>`,
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            overflow: "hidden",
            borderRadius: String(5) + "px",
          }
        }
      });
    }
    
    num2 = 0;
    for (let obj2 of obj.children) {
      createNode({
        mother: contentsTong,
        class: [ titleClassName ],
        attribute: {
          x: String(num),
          y: String(num2),
        },
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          justifyContent: "start",
          alignItems: "start",
          marginBottom: String(basicMargin) + ea,
          marginTop: String(wideMargin) + ea,
        },
        child: {
          text: String(num + 1) + "-" + String(num2 + 1) + " " + obj2.title,
          style: {
            fontSize: String(basicSize) + ea,
            fontWeight: String(700),
            color: colorChip.black,
            lineHeight: String(1.7),
          }
        }
      });

      for (let obj3 of obj2.body) {
        if (obj3.type === "description") {
          createNode({
            mother: contentsTong,
            style: {
              display: "flex",
              position: "relative",
              width: withOut(0, ea),
              justifyContent: "start",
              alignItems: "start",
              marginBottom: String(basicMargin) + ea,
            },
            child: {
              text: obj3.text.join("\n\n"),
              style: {
                fontSize: String(basicSize) + ea,
                fontWeight: String(400),
                color: colorChip.black,
                lineHeight: String(1.7),
              }
            }
          });
        } else if (obj3.type === "image") {
          createNode({
            mother: contentsTong,
            style: {
              display: "flex",
              position: "relative",
              width: withOut(0, ea),
              justifyContent: "start",
              alignItems: "start",
              marginBottom: String(basicMargin) + ea,
            },
            child: {
              mode: "img",
              attribute: { src: obj3.source },
              style: {
                position: "relative",
                width: withOut(0, ea),
                borderRadius: String(5) + "px",
              }
            }
          });
        } else if (obj3.type === "block") {
          createNode({
            mother: contentsTong,
            style: {
              display: "flex",
              position: "relative",
              padding: String(blockTopPadding) + ea,
              paddingLeft: String(blockLeftPadding) + ea,
              paddingRight: String(blockLeftPadding) + ea,
              width: withOut(blockLeftPadding * 2, ea),
              justifyContent: "start",
              alignItems: "start",
              marginBottom: String(basicMargin) + ea,
              background: colorChip.gray0,
              borderRadius: String(5) + "px",
            },
            child: {
              text: obj3.text.map((str) => { return str.replace(/ /gi, "&nbsp;") }).join("\n"),
              style: {
                fontSize: String(blockSize) + ea,
                fontWeight: String(600),
                color: colorChip.black,
                lineHeight: String(1.8),
              }
            }
          });
        } else if (obj3.type === "table") {

          contentsTong.appendChild(instance.mother.makeTable(obj3.matrix, {
            style: {
              titleSize: 13,
              fontSize: 13,
              blockHeight: 42,
            }
          }));
          tempTable = contentsTong.lastChild;
          tempTable.style.width = String(100) + '%';
          tempTable.style.marginTop = String(tableVisualMargin) + ea;
          tempTable.style.marginBottom = String(basicMargin + tableVisualMargin) + ea;

          Array.from(tempTable.children).map((line) => { return line.firstChild }).slice(1).forEach((dom) => {
            dom.style.background = colorChip.gray0;
            dom.firstChild.firstChild.style.fontWeight = String(700);
          });

        }
        
      }
      num2++;
    }
    num++;
  }

}

DashboardJs.prototype.whiteMaker = function (source) {
  const instance = this;
  const { ea, vh, totalContents, belowHeight, grayBarWidth, contentsBase, whitePopupClassName } = this;
  const { createNode, colorChip, withOut, equalJson, cleanChildren, findByAttribute, scrollTo, removeByClass } = GeneralJs;
  let margin;
  let cancelBack, whitePrompt;

  margin = 30;

  window.history.pushState({ path: "popup", status: source }, '');
  removeByClass(whitePopupClassName);

  cancelBack = createNode({
    mother: totalContents,
    class: [ whitePopupClassName ],
    event: {
      click: (e) => {
        window.history.pushState({ path: "init", status: "" }, '');
        removeByClass(whitePopupClassName);
      },
    },
    style: {
      display: "block",
      position: "fixed",
      top: String(0),
      left: String(grayBarWidth) + ea,
      width: withOut(grayBarWidth, ea),
      height: withOut(belowHeight, ea),
      background: colorChip.black,
      opacity: String(0.3),
    }
  });

  whitePrompt = createNode({
    mother: totalContents,
    class: [ whitePopupClassName ],
    style: {
      display: "block",
      position: "fixed",
      top: String(margin) + ea,
      left: String(grayBarWidth + margin) + ea,
      width: withOut(grayBarWidth + (margin * 2), ea),
      height: withOut(belowHeight + (margin * 2), ea),
      borderRadius: String(5) + "px",
      background: colorChip.white,
      boxShadow: "0px 3px 15px -9px " + colorChip.darkShadow,
      animation: "fadeuplite 0.3s ease forwards",
      overflow: "hidden",
    },
    child: {
      mode: "iframe",
      attribute: {
        src: source,
        width: String(100) + '%',
        height: String(100) + '%',
      },
      style: {
        display: "block",
        position: "relative",
        top: String(0),
        left: String(0),
        width: withOut(0, ea),
        height: withOut(0, ea),
        border: String(0),
      }
    }
  })

}

DashboardJs.prototype.whiteEntireMaker = function (source) {
  const instance = this;
  const { ea, vh, totalContents, belowHeight, grayBarWidth, contentsBase, whiteEntireFileViewToken, whiteEntireFileViewTokenKeyName, whitePopupClassName } = this;
  const { createNode, colorChip, withOut, equalJson, cleanChildren, findByAttribute, scrollTo, removeByClass } = GeneralJs;
  let margin;
  let cancelBack, whitePrompt;

  margin = 30;

  window.localStorage.setItem(whiteEntireFileViewTokenKeyName, whiteEntireFileViewToken);
  window.history.pushState({ path: "popup", status: source }, '');
  removeByClass(whitePopupClassName);

  cancelBack = createNode({
    mother: totalContents,
    class: [ whitePopupClassName ],
    event: {
      click: (e) => {
        window.localStorage.setItem(whiteEntireFileViewTokenKeyName, "");
        window.history.pushState({ path: "init", status: "" }, '');
        removeByClass(whitePopupClassName);
      },
    },
    style: {
      display: "block",
      position: "fixed",
      top: String(0),
      left: String(0) + ea,
      width: withOut(0, ea),
      height: withOut(belowHeight, ea),
      background: colorChip.black,
      opacity: String(0.3),
    }
  });

  whitePrompt = createNode({
    mother: totalContents,
    class: [ whitePopupClassName ],
    style: {
      display: "block",
      position: "fixed",
      top: String(margin) + ea,
      left: String(0 + margin) + ea,
      width: withOut(0 + (margin * 2), ea),
      height: withOut(belowHeight + (margin * 2), ea),
      borderRadius: String(5) + "px",
      background: colorChip.white,
      boxShadow: "0px 3px 15px -9px " + colorChip.darkShadow,
      animation: "fadeuplite 0.3s ease forwards",
      overflow: "hidden",
    },
    child: {
      mode: "iframe",
      attribute: {
        src: source,
        width: String(100) + '%',
        height: String(100) + '%',
      },
      style: {
        display: "block",
        position: "relative",
        top: String(0),
        left: String(0),
        width: withOut(0, ea),
        height: withOut(0, ea),
        border: String(0),
      }
    }
  })

}

DashboardJs.prototype.fileSearchEvent = function () {
  const instance = this;
  const { ea, totalContents, whiteEntireFileViewToken, whiteEntireFileViewTokenKeyName, whitePopupClassName } = this;
  const { searchInput } = this;
  searchInput.addEventListener("keypress", async function (e) {
    try {
      if (e.key === "Enter") {
        if (window.localStorage.getItem(whiteEntireFileViewTokenKeyName) === whiteEntireFileViewToken) {
          const value = this.value.trim().replace(/[\=\?\\\/\+\&]/gi, '');
          const targets = Array.from(document.querySelectorAll('.' + whitePopupClassName));
          const target = targets.find((dom) => { return dom.querySelector("iframe") !== null });
          if (target !== undefined) {
            const iframeTarget = target.querySelector("iframe");
            iframeTarget.contentWindow.postMessage(JSON.stringify({ mode: "search", value }), "*");
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  })
}

DashboardJs.prototype.launching = async function () {
  const instance = this;
  const { ajaxJson, removeByClass, returnGet } = GeneralJs;
  try {
    const getObj = returnGet();
    let generalState;

    generalState = true;

    this.belowHeight = this.mother.belowHeight;
    this.searchInput = this.mother.searchInput;
    this.grayBarWidth = this.mother.grayBarWidth;

    this.members = (await ajaxJson({ type: "get" }, BACKHOST + "/getMembers", { equal: true })).filter((obj) => { return obj.alive }).filter((obj) => { return !obj.roles.includes("Bot") });

    this.totalMother = null;
    this.grayBase = null;
    this.contentsBase = null;
    this.baseLoad = () => {}

    this.whiteEntireFileViewToken = "__whiteEntireFileViewToken__";
    this.whiteEntireFileViewTokenKeyName = "whiteEntireFileViewToken";
    this.whitePopupClassName = "whitePopupClassName";

    document.getElementById("grayLeftOpenButton").remove();
    document.getElementById("moveRightArea").style.display = "none";
    document.getElementById("moveLeftArea").style.display = "none";

    this.baseMaker();
    this.grayMaker();
    this.fileSearchEvent();

    window.addEventListener("popstate", (e) => {
      e.preventDefault();
      if (e.state !== null) {
        if (e.state.path === "init") {
          removeByClass(instance.whitePopupClassName);
          instance.baseLoad();
        } else if (e.state.path === "manual") {
          instance.manualMaker(e.state.status);
        } else if (e.state.path === "popup") {
          if (document.querySelector("." + instance.whitePopupClassName) === null) {
            instance.whiteMaker(e.state.status);
          } else {
            removeByClass(instance.whitePopupClassName);
            instance.baseLoad();  
          }
        }
      }
    });

    if (getObj.mode === "manual" && typeof getObj.key === "string") {
      window.history.pushState({ path: "init", status: "" }, '');
      if (getObj.key === "first") {
        instance.manualMaker("firstResponse");
      } else if (getObj.key === "proposal") {
        instance.manualMaker("designerProposal");
      }
    } else if (getObj.mode === "file") {
      if (typeof getObj.path !== "string") {
        instance.whiteEntireMaker(window.location.protocol + "//" + window.location.host + "/file?mode=general&entire=true&dataonly=true");
        generalState = false;
      } else {
        instance.whiteEntireMaker(window.location.protocol + "//" + window.location.host + "/file?mode=general&entire=true&dataonly=true&id=" + getObj.path);
        generalState = false;
      }
    }

    if (generalState) {
      if (getObj.mode !== "board") {
        if (window.localStorage.getItem(this.whiteEntireFileViewTokenKeyName) === this.whiteEntireFileViewToken) {
          instance.whiteEntireMaker(window.location.protocol + "//" + window.location.host + "/file?mode=general&entire=true&dataonly=true");
        }
      }
    }

    this.mother.belowButtons.sub.folder.addEventListener("click", function (e) {
      instance.whiteEntireMaker(window.location.protocol + "//" + window.location.host + "/file?mode=home&entire=true&dataonly=true");
    });

  } catch (e) {
    ajaxJson({
      message: "DashboardJs.prototype.launching error : " + e.message,
      channel: "#error_log"
    }, "/sendSlack").catch((err) => {
      console.log(err);
    });
    console.log(e);
  }
}
