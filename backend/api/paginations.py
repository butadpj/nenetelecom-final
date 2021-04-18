from rest_framework import pagination

class ProductPagination(pagination.LimitOffsetPagination):
    limit_query_param = "limit"
    offset_query_param = "offset"
    max_limit = 10