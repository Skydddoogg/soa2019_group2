# Create a post

## POST /api/post/create

Data in header

| Header | Value |
| - | - |
| Content-Type | application/json |

Data in body/payload of HTTP Request

```
{
    "subject" : "Math",
    "level" : "upper-secondary",
    "startTime" : "9.00",
    "endTime" : "11.00",
    "location" : "Siam Square One",
    "expectPrice" : 2000,
    "detail" : "รายละเอียดทั่วไป",
    "creatorId" : "1239458711",
    "creatorUsername" : "muse",
    "creatorType" : "tutor"
}
```
## Expectation

| Assert | Expected |
| - | - |
| StatusCode | 201 |

# Update a post

## PUT /api/post/update/5c98e66d58d76a2cdd2ffd84

Data in header

| Header | Value |
| - | - |
| Content-Type | application/json |

Data in body/payload of HTTP Request

```
{
    "subject": "thai",
    "level": "lower-secondary",
    "startTime": "10:00",
    "endTime": "15:00",
    "location": "Paradise Park",
    "expectPrice": 1000,
    "detail": "Mock up detail WITH EDITED",
    "creatorId": "xyz321",
    "creatorUsername": "lieze",
    "creatorType": "student"
}
```
## Expectation

| Assert | Expected |
| - | - |
| StatusCode | 200 |

# Delete a post

## DELETE /api/post/delete/5c98e94058d76a2cdd2ffd88

## Expectation

| Assert | Expected |
| - | - |
| StatusCode | 200 |

