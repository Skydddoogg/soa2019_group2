# Get a post from API 

## GET /search/math/High school/0/1000

## Expectation

| Assert | Expected |
| - | - |
| Data[0].subject | math |
| Data[0].level | High school |
| Data[0].expect_price | 500 |
| Data[0].creator_id | 0123456789 |
| Data[0].creator_username | riariaria |
| Data[0].creator_type | student |

# Get multiple posts from API

## GET /search/math&English/High school/0/1000

## Expectation

| Assert | Expected |
| - | - |
| Data[0].subject | English |
| Data[0].level | High school |
| Data[0].expect_price | 1000 |
| Data[0].creator_id | 1239458711 |
| Data[0].creator_username | muse |
| Data[0].creator_type | tutor |
| Data[1].subject | math |
| Data[1].level | High school |
| Data[1].expect_price | 500 |
| Data[1].creator_id | 0123456789 |
| Data[1].creator_username | riariaria |
| Data[1].creator_type | student |

