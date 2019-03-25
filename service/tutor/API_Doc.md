# Get a tutor information from API

## GET /tutor/5c95df952e8ac9e80f739ac1

## Expectation

| Assert | Expected |
| - | - |
| Data[0].name | mask |
| Data[0].email | 59070156@it.kmitl.ac.th |
| Data[0].posts | 5 |
| Data[0].education | KMITL |
| Data[0].profile_img_url | https://www.google.com |



# Try to get tutor information from API that is not exist in the database

## GET /tutor/5c95ec2cd371e61531032c89

## Expectation

| Assert | Expected |
| - | - |
| Data | *should not exist* |
