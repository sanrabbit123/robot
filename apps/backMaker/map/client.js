module.exports = {
  main: {
    name: "",
    phone: "",
    email: "",
    cliid: "",
    request: [],
  },
  sub: {
    request: {
			firstRequest: {
				timeline: "9999-09-09",
				budget: "알 수 없음", // [ '500만원 이하', '1,000만원', '1,500만원', '2,000만원', '2,500만원', '3,000만원', '3,500만원', '4,000만원', '4,500만원', '5,000만원 이상' ]
				family: "",
				space: {
					address: "",
					contract: "알 수 없음", // [ '전월세', '자가' ]
					pyeong: 0,
					spec: {
						room: 0,
						bathroom: 0,
						valcony: false
					},
					resident: {
						living: false,
						expected: "9999-09-09",
					},
				},
				etc: {
					comment: "",
					channel: "",
				},
			},
			secondAnalysis: {
				response: {
					status: "응대중", // [ '드랍', '진행', '응대중', '완료' ]
					outreason: [], // [ '연결 안 됨', '가벼운 문의', '타사 계약', '비용 문제', '의견 조정 안 됨', '직접 진행' ]
				},
				date: {
					phonecall: {
						latest: "9999-09-09",
						next: "9999-09-09",
					},
					space: {
						precheck: "9999-09-09",
						empty: "9999-09-09",
						movein: "9999-09-09",
					},
				},
				picture: {
					space: {
						submit: false,
						folderName: "",
					},
					style: {
						submit: false,
						folderName: "",
					},
				},
				history: "",
			},
			thirdProposal: {
				service: [],
				proid: "",
				send: false,
			},
		},
  }
}
