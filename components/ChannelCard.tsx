import type { LiveChannel } from '@/types'

interface ChannelCardProps {
  channel: LiveChannel
}

export default function ChannelCard({ channel }: ChannelCardProps) {
  const logoUrl = channel.metadata.channel_logo?.imgix_url
  const isLive = channel.metadata.currently_live
  const currentProgram = channel.metadata.current_program

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden card-hover">
      <div className="relative aspect-video bg-gray-200">
        {logoUrl && (
          <img
            src={`${logoUrl}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={channel.metadata.channel_name}
            className="w-full h-full object-cover"
          />
        )}
        {isLive && (
          <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            LIVE
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">
          {channel.metadata.channel_name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {channel.metadata.description}
        </p>
        {currentProgram && isLive && (
          <div className="bg-primary-50 text-primary-700 px-3 py-2 rounded-lg text-sm mb-3">
            <span className="font-semibold">Now Playing:</span> {currentProgram}
          </div>
        )}
        <span className="inline-block text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
          {channel.metadata.channel_type.value}
        </span>
      </div>
    </div>
  )
}