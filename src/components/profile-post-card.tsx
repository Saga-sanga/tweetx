export function ProfilePostCard() {
  return (
    <div className="flex relative p-4 overflow-clip">
      <div className="bg-primary h-12 w-12 absolute rounded-full bottom-12 -right-6"></div>
      <div className="mx-3 shrink-0 rounded-full border border-gray-400 h-14 w-14"></div>
      <div className="flex space-y-3 py-4 pr-8 flex-col w-full">
        <div className="flex justify-between">
          <h2 className="pl-2 text-lg font-medium text-muted-foreground">
            Arjun Reddy
          </h2>
          <span className="text-xs text-muted-foreground/60">10 mins ago</span>
        </div>
        <p className="text-sm text-muted-foreground/60">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
          repudiandae aliquid ut voluptates nobis delectus veniam saepe aperiam
          eligendi fuga.
        </p>
      </div>
    </div>
  );
}
