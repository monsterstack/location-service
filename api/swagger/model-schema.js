'use strict'
/**
 * @swagger
 * definitions:
 *   Error:
 *     type: object
 *     required:
 *        - errorMessage
 *     properties:
 *        errorMessage:
 *          type: string
 *   Health:
 *     type: object
 *     required:
 *        - cpuPercentUsage
 *        - totalMemPercentageUsage
 *        - loadAvg
 *   PageDescriptor:
 *     type: object
 *     required:
 *       - page
 *       - size
 *       - total
 *     properties:
 *        page:
 *          type: integer
 *          format: int64
 *        size:
 *          type: integer
 *          format: int64
 *        total:
 *          type: integer
 *          format: int64
 *   PageResponse:
 *     type: object
 *     required:
 *       - page
 *       - elements
 *     properties:
 *       page:
 *          type: object
 *          schema:
 *            $ref: '#/definitions/PageDescriptor'
 *       elements:
 *          type: array
 */
