SELECT 
    client.name,
    client.cliid,
    client.timeline,
    client.pyeong,
    project.remainConsumer,

FROM
    client JOIN project ON client.cliid = project.cliid

WHERE
    client.timeline BETWEEN "2024-03-01" AND "2024-03-10"
    AND client.status REGEXP "진행"

-- SELECT
--     client.name,
--     client.cliid,
--     client.timeline,
--     client.pyeong,

-- FROM
--     client

-- WHERE
--     client.timeline BETWEEN "2024-03-01" AND "2024-03-10"
--     AND status REGEXP "진행"