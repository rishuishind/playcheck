import Image from "next/image";

type Props = {
  user_image_url: string;
  user_name: string;
  review_type_name: string;
  user_comment: string;
  user_rating: string;
  review_posting_time: string;
};

export default function FullReviewCard({
  user_image_url,
  user_name,
  review_type_name,
  user_comment,
  user_rating,
  review_posting_time,
}: Props) {
  // Function to replace all but the last occurrence of \n with <br />
  function replaceAllButLast(str: string) {
    let matches = str.match(/\n/g);
    if (!matches) return str;

    return str.replace(/\n/g, (match, offset, string) => {
      return offset === string.lastIndexOf(match) ? match : "<br />";
    });
  }

  // Replace all but the last \n with <br />
  const userComment = replaceAllButLast(user_comment);

  return (
    <div className="w-full min-w-[300px] flex flex-col bg-white border-2 rounded-lg p-3">
      <div className="flex items-center">
        <Image
          src={user_image_url}
          alt={user_name}
          width={40}
          height={40}
          priority
          className="w-10 h-10 rounded-full mr-4 border-2"
        />
        <div>
          <h3 className="text-sm font-semibold uppercase">{user_name}</h3>
          <p className="text-xs text-gray-500">
            <span className="text-sm text-secondary font-medium mr-2">
              {user_rating}
            </span>
            {review_type_name}
          </p>
        </div>
      </div>
      <div className="mt-2 ml-14">
        <p
          className="text-sm lg:text-base text-gray-700"
          dangerouslySetInnerHTML={{ __html: userComment }}
        />
      </div>
      <div className="ml-14 mt-0.5">
        <p className="text-sm text-gray-500">- {review_posting_time}</p>
      </div>
    </div>
  );
}
