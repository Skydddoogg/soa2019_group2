# Post data with correctness of format to API

## POST /post/create

Data in header

| Header | Value |
| - | - |
| Content-Type | application/json |

Data in body/payload of HTTP Request

```
{
    "subject": "math",
    "level": "lower-secondary",
    "startTime": "13.00",
    "endTime": "17.00",
    "location": "Seacon Square",
    "expectPrice": "500",
    "detail": "detail for student post",
    "creatorId": "0123456789",
    "creatorUsername": "riariaria",
    "creatorType": "student"
}
```
## Expectation

| Assert | Expected |
| - | - |
| StatusCode | 201 |

# Post data with incorrectness of format to API

## POST /post/create

Data in header

| Header | Value |
| - | - |
| Content-Type | application/json |

Data in body/payload of HTTP Request

```
{
    "level": "lower-secondary",
    "startTime": "13.00",
    "endTime": "17.00",
    "location": "Seacon Square",
    "expectPrice": "500",
    "detail": "detail for student post",
    "creatorId": "0123456789",
    "creatorUsername": "riariaria",
    "creatorType": "student"
}
```
## Expectation

| Assert | Expected |
| - | - |
| StatusCode | 400 |
