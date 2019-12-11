2094ac8c-6fb7-4eab-907e-9ef74f1f1bb3
1

{
	"user_id":"2094ac8c-6fb7-4eab-907e-9ef74f1f1bb3",
	 "selectedgoals":[
					{"goal_id":"1","goal":"Retirement"},
					{"goal_id":"2","goal":"Holiday"},
					{"goal_id":"5","goal":"Car"},
					{"goal_id":"8","goal":"Starting Business"}
					]
		
	
}

53353eca-81cf-4fea-8e06-11e133e74f52

{
	"user_id":"53353eca-81cf-4fea-8e06-11e133e74f52",
	"goal_details":[{"goal_id":1,
					"answer":[{"answer1":1},{"answer2":2},{"answer3":3},{"answer4":4},{"answer5":1},{"answer6":6}
								]
					},
					{"goal_id":2,
						"answer":[{"answer1":1},{"answer2":2},{"answer3":3},{"answer4":4},{"answer5":1},{"answer6":6}
								]
					},
					{"goal_id":3,
						"answer":[{"answer1":1},{"answer2":2},{"answer3":3},{"answer4":4},{"answer5":1},{"answer6":6}
						]
					},
					{"goal_id":3,
						"answer":[{"answer1":1},{"answer2":2},{"answer3":3},{"answer4":4},{"answer5":1},{"answer6":6}
						]
					},					
				] 					
}


CREATE TABLE answers(id int AUTO_INCREMENT,
                    user_id varchar(50) NOT NULL,
                    goal_id int NOT NULL,
                    answer1 int(30),
                    answer2 int(30),
                    answer3 int(30),
                    answer4 int(30),
                    answer5 int(30),
                    answer6 int(30),
                    PRIMARY KEY(id),
                    FOREIGN KEY(user_id) REFERENCES user(user_id),
                    FOREIGN KEY(goal_id) REFERENCES goals(goal_id)
					)
					
					{
						"user_id":"2094ac8c-6fb7-4eab-907e-9ef74f1f1bb3",
						"goal_details":[
										{"goal_id":11,"answer":[{"answer1":100,"answer2":2000,"answer3":300000,"answer4":40000000,"answer5":50000,"answer6":60000} ]},
										{"goal_id":12,"answer":[{"answer1":10000000,"answer2":20000000,"answer3":30000,"answer4":4000000,"answer5":500000,"answer6":600000} ]},
										{"goal_id":13,"answer":[{"answer1":20000,"answer2":3000,"answer3":300000,"answer4":400,"answer5":5000,"answer6":6} ]}
										]
					}
					