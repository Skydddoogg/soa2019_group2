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
| Data[0].subject | English |
| Data[0].level | High school |
| Data[0].expectPrice | 1000 |
| Data[0].creatorId | 1239458711 |
| Data[0].creatorUsername | muse |
| Data[0].creatorType | tutor |
| Data[1].subject | math |
| Data[1].level | High school |
| Data[1].expectPrice | 500 |
| Data[1].creatorId | 0123456789 |
| Data[1].creatorUsername | riariaria |
| Data[1].creatorType | student |

# Get a non-existing post

## GET /api/search/science/High%20school/0/1000

## Expectation

| Assert | Expected |
| - | - |
| StatusCode | 400 |
