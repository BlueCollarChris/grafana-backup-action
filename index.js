import { write } from './lib/write.js'
import { fetchDashboards, fetchDashboard, fetchFolders, fetchAlerts} from './lib/grafana.js'

const writeFiles = []
const dashboards = await fetchDashboards()
const folders = await fetchFolders()
const alerts = await fetchAlerts()

writeFiles.push(write('folders.json', folders))
writeFiles.push(write('dashboards.json', dashboards))
writeFiles.push(write('alerts.json', alerts))

for (const d of dashboards) {
  const db = await fetchDashboard(d.uid)
  writeFiles.push(write(`${d.uri.replace('db/', '')}.json`, db))
}

await Promise.all(writeFiles)
