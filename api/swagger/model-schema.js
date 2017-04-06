'use strict'
/**
 * @swagger
 * tags:
 *  - name: error
 *    description: 'Everything you need to know about Error'
 *  - name: health
 *    description: 'Everything you need to know about Health'
 *  - name: ticket
 *    description: 'Everything you need to know about Ticket'
 *  - name: account
 *    description: 'Everything you need to know about InflightAccount'
 * definitions:
 *   Ticket:
 *     type: object
 *     required:
 *        - inflightAccountId
 *        - ttl
 *        - startTime
 *        - destination
 *     properties:
 *        id:
 *          type: string
 *        inflightAccountId:
 *          type: string
 *        startTime:
 *          type: number
 *          format: date
 *        destination:
 *          type: object
 *          schema:
 *             $ref: "#/definitions/Destination"
 *        ttl:
 *          type: integer
 *        timestamp:
 *          type: integer
 *   InflightAccount:
 *      type: object
 *      required:
 *         - firstName
 *         - lastName
 *      properties:
 *        id: 
 *          type: string
 *        firstName:
 *          type: string
 *        lastName:
 *          type: string
 *        onBehalfOfTitle:
 *          type: string
 *        onBehalfOfLogoUrl:
 *          type: string
 *        avatarUrl:
 *          type: string
 *        timestamp:
 *          type: integer
 *        ttl:
 *          type: integer
 *   Destination:
 *      type: object
 *      required:
 *         - street
 *         - city
 *         - state
 *         - postalCode
 *         - countryCode
 *      properties:
 *        street:
 *          type: string
 *        city:
 *          type: string
 *        state: 
 *          type: string
 *        postalCode:
 *          type: string
 *        country:
 *          type: string    
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
 *        - loadAvg
 *     properties:
 *        cpuPercentUsage:
 *          type: number
 *        loadAvg:
 *          type: number
 */
