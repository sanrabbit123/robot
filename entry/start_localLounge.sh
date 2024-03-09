#!/bin/bash
hypercorn entry.human_localLounge:app -b 0.0.0.0:8000 -w 2