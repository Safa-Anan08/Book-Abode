"use client";

export default function RecentActivity({
  activity,
}: any) {
 return (
  <section className="rounded-3xl bg-[#C3955B] p-6">


    <div className="mb-8">

      <span className="rounded-full bg-[#261311] px-4 py-2 text-xs font-semibold tracking-wider text-[#C3955B]">
        RECENT ACTIVITY
      </span>

      <h2 className="mt-4 text-3xl font-bold text-[#261311]">
        Dashboard Activity
      </h2>

      <p className="mt-2 text-[#261311]/70">
        Track the latest users, books, wishlists and reports.
      </p>

    </div>

    <div className="grid gap-6 lg:grid-cols-2">

      <ActivityCard
        title="Latest Users"
        items={activity.users}
        field="name"
      />

      <ActivityCard
        title="Latest Books"
        items={activity.books}
        field="title"
      />

      <ActivityCard
        title="Latest Wishlists"
        items={activity.wishlists}
        field="userEmail"
      />

      <ActivityCard
        title={`Pending Reports (${activity.pendingReports})`}
        items={activity.reports}
        field="bookTitle"
      />

    </div>

  </section>
);
}

function ActivityCard({
  title,
  items,
  field,
}: any) {
 return (
  <div className="rounded-3xl border border-[#C3955B]/20 bg-[#261311] p-6 shadow-xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl">

    <div className="mb-6 flex items-center justify-between">

      <h2 className="text-xl font-bold text-[#C3955B]">
        {title}
      </h2>

      <span className="rounded-full bg-[#C3955B]/15 px-3 py-1 text-xs font-semibold text-[#C3955B]">
        {items.length}
      </span>

    </div>


    <div className="space-y-3">

      {items.length === 0 ? (

        <div className="rounded-xl border border-dashed border-[#C3955B]/20 bg-[#3A241C] py-8 text-center text-gray-400">
          No data available
        </div>

      ) : (

        items.map((item: any) => (
          <div
            key={item._id}
            className="flex items-center justify-between rounded-xl border border-[#C3955B]/10 bg-[#3A241C] px-4 py-3 transition hover:border-[#C3955B]/40 hover:bg-[#4A2C22]"
          >
            <span className="font-medium text-white">
              {item[field]}
            </span>

            <span className="text-sm text-gray-400">
              {new Date(item.createdAt).toLocaleDateString()}
            </span>
          </div>
        ))

      )}

    </div>

  </div>
);
}