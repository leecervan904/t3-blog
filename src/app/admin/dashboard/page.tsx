import { api } from "~/trpc/server"
import { LineChart } from './_components/LineChart'

export default async function Page() {
  const { postCount, categoryCount, dailyPosts } = await api.post.getSummarize.query()

  return (
    <div className="p-3">
      <div className="flex gap-3">
        <div className="px-5 py-10 bg-blue-300 rounded">
          <h2 className="text-2xl">Total Posts:</h2>
          <h3 className="text-xl">{postCount}</h3>
        </div>

        <div className="flex-1 bg-red-300 rounded">

        </div>
      </div>

      <pre>{JSON.stringify(dailyPosts, null, 2)}</pre>

      <div>
        <LineChart data={dailyPosts} xField="date" yField="count" />
      </div>
    </div>
  )
}
