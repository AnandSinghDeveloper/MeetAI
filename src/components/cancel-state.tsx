import EmptyState from "./empty-state";

export const CancelledState = () => {
  return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col items-center justify-center gap-y-8">
      <EmptyState
        image="/canceled.svg"
        title="Meeting Cancelled"
        discription="This meeting was cancelled"
      />
    </div>
  );
};
