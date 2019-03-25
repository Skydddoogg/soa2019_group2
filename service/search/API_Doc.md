# Get all posts

## GET /api/search/default/default/0/100000

## Expectation

| Assert | Expected |
| - | - |
| Data[0].creatorId | 3029185301 |
| Data[1].creatorId | 4028192345 |
| Data[2].creatorId | 0123456789 |

# Get a post from API 

## GET /api/search/math/High school/0/1000

## Expectation

| Assert | Expected |
| - | - |
| Data[0].subject | math |
| Data[0].level | High school |
| Data[0].expectPrice | 500 |
| Data[0].creatorId | 0123456789 |
| Data[0].creatorUsername | riariaria |
| Data[0].creatorType | student |

# Get multiple posts from API

## GET /api/search/math&English/High school/0/1000

## Expectation

| Assert | Expected |
| - | - |
| Data[0].subject | math |
| Data[0].level | High school |
| Data[0].expectPrice | 500 |
| Data[0].creatorId | 0123456789 |
| Data[0].creatorUsername | riariaria |
| Data[0].creatorType | student |
| Data[1].subject | English |
| Data[1].level | High school |
| Data[1].expectPrice | 1000 |
| Data[1].creatorId | 1239458711 |
| Data[1].creatorUsername | muse |
| Data[1].creatorType | tutor |

# Try to get post from API that is not exist in the database

## GET /api/search/math/M.4/500/1000

## Expectation

| Assert | Expected |
| - | - |
| Data | *should not exist* |
