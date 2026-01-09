import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  AppWindow,
  Bold,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  Clipboard,
  ClipboardPaste,
  FilePlus,
  FileText,
  Folder,
  FolderPlus,
  HelpCircle,
  Info,
  Italic,
  Keyboard,
  List,
  MessageCircle,
  Package,
  Plus,
  Search,
  Settings,
  Share,
  Sparkles,
  Trash2,
  Underline,
} from "lucide-react";
import * as React from "react";
import {
  Alert,
  Button,
  ButtonGroup,
  Checkbox,
  DisclosureButton,
  DropdownMenu,
  ListItem,
  MenuContent,
  MenuHeader,
  MenuItem,
  MenuSeparator,
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopUpButton,
  PulldownButton,
  Radio,
  Scrollbar,
  Segment,
  SegmentedControl,
  SidebarItem,
  SidebarSection,
  Switch,
  TextField,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Typography,
  Window,
  WindowSearch,
} from "@/components";

function App() {
  const [_isNotificationsEnabled, _setIsNotificationsEnabled] = React.useState(true);
  const [selectedSidebar, setSelectedSidebar] = React.useState("all-components");
  const [showAlert, setShowAlert] = React.useState(false);
  const [liquidGlassEnabled, _setLiquidGlassEnabled] = React.useState(true);
  const [viewMode, setViewMode] = React.useState("list");
  const [sortBy, setSortBy] = React.useState("name");
  const [disclosureExpanded, setDisclosureExpanded] = React.useState(true);
  const [selectedFont, setSelectedFont] = React.useState("SF Pro");
  const [selectedListItem, setSelectedListItem] = React.useState("overlays");
  const [textAlign, setTextAlign] = React.useState("left");
  const [textStyle, setTextStyle] = React.useState<string[]>([]);
  const [scrollPos1, setScrollPos1] = React.useState(0.2);
  const [scrollPos2, setScrollPos2] = React.useState(0.6);
  const [scrollPosH, setScrollPosH] = React.useState(0.3);

  return (
    <TooltipProvider>
      <div
        className="flex min-h-screen items-center justify-center p-4 lg:p-10"
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #533483 75%, #e94560 100%)",
        }}
      >
        <Window
          title="Tahoe UI Component Library"
          width="100%"
          height="100%"
          className="max-h-212.5 max-w-6xl"
          liquidGlass={liquidGlassEnabled}
          toolbar={
            <div className="flex w-full items-center justify-between gap-4">
              {/* Back/Forward - Button Group */}
              <ButtonGroup
                size="xl"
                selectionMode="none"
                items={[
                  { icon: <ChevronLeft className="h-5! w-5! opacity-60" />, value: "back", "aria-label": "Go back" },
                  {
                    icon: <ChevronRight className="h-5! w-5! opacity-60" />,
                    value: "forward",
                    "aria-label": "Go forward",
                  },
                ]}
                onValueChange={(val) => console.log("Navigate:", val)}
              />

              {/* Search - Window Search */}
              <div className="max-w-md flex-1">
                <WindowSearch size="xl" placeholder="Search documentation..." className="w-full" />
              </div>

              {/* Action Icons - Button Group */}
              <ButtonGroup
                size="xl"
                selectionMode="none"
                items={[
                  { icon: <Share className="opacity-70" />, value: "share", "aria-label": "Share" },
                  { icon: <MessageCircle className="opacity-70" />, value: "message", "aria-label": "Message" },
                  { icon: <Plus className="opacity-70" />, value: "add", "aria-label": "Add" },
                ]}
                onValueChange={(val) => console.log("Action:", val)}
              />
            </div>
          }
          sidebar={
            <div className="flex flex-1 flex-col py-2">
              <SidebarSection title="Library">
                <SidebarItem
                  state={selectedSidebar === "all-components" ? "selected" : "default"}
                  onClick={() => setSelectedSidebar("all-components")}
                  icon={<Package className="h-4 w-4" />}
                >
                  All Components
                </SidebarItem>
              </SidebarSection>

              <SidebarSection title="Components">
                <SidebarItem
                  state={selectedSidebar === "buttons" ? "selected" : "default"}
                  onClick={() => {
                    setSelectedSidebar("buttons");
                    document.getElementById("section-buttons")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  icon={<CircleDot className="h-4 w-4" />}
                >
                  Buttons
                </SidebarItem>
                <SidebarItem
                  state={selectedSidebar === "toggles" ? "selected" : "default"}
                  onClick={() => {
                    setSelectedSidebar("toggles");
                    document.getElementById("section-toggles")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  icon={<Sparkles className="h-4 w-4" />}
                >
                  Toggles
                </SidebarItem>
                <SidebarItem
                  state={selectedSidebar === "text-fields" ? "selected" : "default"}
                  onClick={() => {
                    setSelectedSidebar("text-fields");
                    document.getElementById("section-text-fields")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  icon={<Keyboard className="h-4 w-4" />}
                >
                  Text Fields
                </SidebarItem>
                <SidebarItem
                  state={selectedSidebar === "segmented-controls" ? "selected" : "default"}
                  onClick={() => {
                    setSelectedSidebar("segmented-controls");
                    document.getElementById("section-segmented-controls")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  icon={<List className="h-4 w-4" />}
                >
                  Segmented Controls
                </SidebarItem>
                <SidebarItem
                  state={selectedSidebar === "pop-up-pull-down" ? "selected" : "default"}
                  onClick={() => {
                    setSelectedSidebar("pop-up-pull-down");
                    document.getElementById("section-pop-up-pull-down")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  icon={<List className="h-4 w-4" />}
                >
                  Pop-up/Pull-down
                </SidebarItem>
                <SidebarItem
                  state={selectedSidebar === "sidebars" ? "selected" : "default"}
                  onClick={() => {
                    setSelectedSidebar("sidebars");
                    document.getElementById("section-sidebars")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  icon={<AppWindow className="h-4 w-4" />}
                >
                  Sidebars
                </SidebarItem>
                <SidebarItem
                  state={selectedSidebar === "lists-tables" ? "selected" : "default"}
                  onClick={() => {
                    setSelectedSidebar("lists-tables");
                    document.getElementById("section-lists-tables")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  icon={<List className="h-4 w-4" />}
                >
                  Lists and Tables
                </SidebarItem>
                <SidebarItem
                  state={selectedSidebar === "alerts" ? "selected" : "default"}
                  onClick={() => {
                    setSelectedSidebar("alerts");
                    document.getElementById("section-alerts")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  icon={<Info className="h-4 w-4" />}
                >
                  Alerts
                </SidebarItem>
                <SidebarItem
                  state={selectedSidebar === "tooltips" ? "selected" : "default"}
                  onClick={() => {
                    setSelectedSidebar("tooltips");
                    document.getElementById("section-tooltips")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  icon={<HelpCircle className="h-4 w-4" />}
                >
                  Tooltips
                </SidebarItem>
              </SidebarSection>

              <div className="mt-auto p-4 opacity-40">
                <Typography variant="caption-2">v1.0.0-alpha</Typography>
              </div>
            </div>
          }
        >
          <div className="flex h-full flex-col bg-white dark:bg-[#1E1E1E]">
            <div className="flex-1 space-y-12 overflow-auto p-6 pb-24 lg:p-10">
              {/* Header */}
              <header className="space-y-2 border-black/5 border-b pb-8">
                <Typography variant="large-title" emphasis={true}>
                  Showcase
                </Typography>
                <Typography variant="title-3" className="max-w-2xl text-gray-500">
                  Explore the Tahoe UI components. This library is built using React 19, Radix UI, and Tailwind CSS v4,
                  following the official Figma design kit.
                </Typography>
              </header>

              {/* Buttons Section */}
              <section id="section-buttons" className="scroll-mt-6 space-y-6">
                <Typography variant="title-1" emphasis={true}>
                  Buttons
                </Typography>
                <div className="rounded-xl bg-black/1.5 p-6 dark:bg-white/1.5">
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-3">
                      <Typography variant="headline">Primary</Typography>
                      <Button className="w-full">Default Action</Button>
                      <Button size="sm" className="w-full">
                        Small Action
                      </Button>
                    </div>
                    <div className="space-y-3">
                      <Typography variant="headline">Secondary</Typography>
                      <Button variant="secondary" className="w-full">
                        Cancel
                      </Button>
                      <Button variant="secondary" size="sm" className="w-full">
                        Dismiss
                      </Button>
                    </div>
                    <div className="space-y-3">
                      <Typography variant="headline">Destructive</Typography>
                      <Button variant="destructive" className="w-full">
                        Delete Item
                      </Button>
                      <Button variant="destructive" size="sm" className="w-full">
                        Trash
                      </Button>
                    </div>
                    <div className="space-y-3">
                      <Typography variant="headline">Ghost</Typography>
                      <Button variant="ghost" className="w-full text-blue-500">
                        More Options
                      </Button>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg bg-black/5">
                          <Info className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg bg-black/5">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-lg bg-black/5 text-red-500"
                          onClick={() => setShowAlert(true)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Button Group Section */}
              <section id="section-button-group" className="scroll-mt-6 space-y-6">
                <Typography variant="title-1" emphasis={true}>
                  Button Group
                </Typography>
                <div className="space-y-6 rounded-xl bg-black/1.5 p-6 dark:bg-white/1.5">
                  <div className="space-y-3">
                    <Typography variant="headline">Size: XL (36px)</Typography>
                    <div className="flex flex-wrap items-center gap-6">
                      <ButtonGroup
                        size="xl"
                        items={[
                          { icon: <ChevronLeft className="h-5 w-5" />, value: "prev", "aria-label": "Previous" },
                          { icon: <ChevronRight className="h-5 w-5" />, value: "next", "aria-label": "Next" },
                        ]}
                        value="prev"
                        onValueChange={(val) => console.log(val)}
                      />
                      <ButtonGroup
                        size="xl"
                        items={[
                          { icon: <AlignLeft className="h-5 w-5" />, value: "left", "aria-label": "Align left" },
                          { icon: <AlignCenter className="h-5 w-5" />, value: "center", "aria-label": "Align center" },
                          { icon: <AlignRight className="h-5 w-5" />, value: "right", "aria-label": "Align right" },
                        ]}
                        value={textAlign}
                        onValueChange={(val) => setTextAlign(val as string)}
                      />
                      <ButtonGroup
                        size="xl"
                        selectionMode="multiple"
                        items={[
                          { icon: <Bold className="h-5 w-5" />, value: "bold", "aria-label": "Bold" },
                          { icon: <Italic className="h-5 w-5" />, value: "italic", "aria-label": "Italic" },
                          { icon: <Underline className="h-5 w-5" />, value: "underline", "aria-label": "Underline" },
                        ]}
                        value={textStyle}
                        onValueChange={(val) => setTextStyle(val as string[])}
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Typography variant="headline">Size: Medium (24px)</Typography>
                    <div className="flex flex-wrap items-center gap-6">
                      <ButtonGroup
                        size="medium"
                        items={[
                          { icon: <ChevronLeft className="h-4 w-4" />, value: "prev", "aria-label": "Previous" },
                          { icon: <ChevronRight className="h-4 w-4" />, value: "next", "aria-label": "Next" },
                        ]}
                        value="next"
                        onValueChange={(val) => console.log(val)}
                      />
                      <ButtonGroup
                        size="medium"
                        items={[
                          { icon: <AlignLeft className="h-4 w-4" />, value: "left", "aria-label": "Align left" },
                          { icon: <AlignCenter className="h-4 w-4" />, value: "center", "aria-label": "Align center" },
                          { icon: <AlignRight className="h-4 w-4" />, value: "right", "aria-label": "Align right" },
                        ]}
                        value="center"
                        onValueChange={(val) => console.log(val)}
                      />
                      <ButtonGroup
                        size="medium"
                        selectionMode="multiple"
                        items={[
                          { icon: <Bold className="h-4 w-4" />, value: "bold", "aria-label": "Bold" },
                          { icon: <Italic className="h-4 w-4" />, value: "italic", "aria-label": "Italic" },
                          { icon: <Underline className="h-4 w-4" />, value: "underline", "aria-label": "Underline" },
                        ]}
                        value={["bold", "italic"]}
                        onValueChange={(val) => console.log(val)}
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Toggles Section */}
              <section id="section-toggles" className="scroll-mt-6 space-y-6">
                <Typography variant="title-1" emphasis={true}>
                  Toggles
                </Typography>
                <div className="space-y-8 rounded-xl bg-black/1.5 p-6 dark:bg-white/1.5">
                  <div className="space-y-4">
                    <Typography variant="headline">Switch</Typography>
                    <div className="space-y-4">
                      <div className="flex max-w-md items-center justify-between">
                        <div className="space-y-1">
                          <Typography variant="body">Wi-Fi</Typography>
                          <Typography variant="caption-1" className="text-gray-500">
                            Connect to wireless networks
                          </Typography>
                        </div>
                        <Switch defaultChecked={true} />
                      </div>
                      <div className="flex max-w-md items-center justify-between">
                        <div className="space-y-1">
                          <Typography variant="body">Bluetooth</Typography>
                          <Typography variant="caption-1" className="text-gray-500">
                            Enable Bluetooth devices
                          </Typography>
                        </div>
                        <Switch defaultChecked={true} />
                      </div>
                      <div className="flex max-w-md items-center justify-between">
                        <div className="space-y-1">
                          <Typography variant="body">AirDrop</Typography>
                          <Typography variant="caption-1" className="text-gray-500">
                            Receive files from nearby devices
                          </Typography>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Typography variant="headline">Checkbox</Typography>
                    <div className="space-y-2">
                      <Checkbox label="Sync with iCloud" defaultChecked={true} />
                      <Checkbox label="Automatic Updates" />
                      <Checkbox label="Show Hidden Files" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Typography variant="headline">Radio Button</Typography>
                    <div className="space-y-2">
                      <Radio name="performance" label="Low Performance" />
                      <Radio name="performance" label="Balanced" defaultChecked={true} />
                      <Radio name="performance" label="High Performance" />
                    </div>
                  </div>
                </div>
              </section>

              {/* Text Fields Section */}
              <section id="section-text-fields" className="scroll-mt-6 space-y-6">
                <Typography variant="title-1" emphasis={true}>
                  Text Fields
                </Typography>
                <div className="space-y-4 rounded-xl bg-black/1.5 p-6 dark:bg-white/1.5">
                  <TextField label="Standard Input" placeholder="Type something..." />
                  <TextField
                    variant="search"
                    label="Search Field"
                    placeholder="Search files..."
                    icon={<Search className="h-4 w-4" />}
                  />
                  <TextField label="Disabled Input" disabled={true} placeholder="Not editable" />
                  <TextField label="Error State" error="This field is required" defaultValue="Invalid value" />
                </div>
              </section>

              {/* Segmented Controls Section */}
              <section id="section-segmented-controls" className="scroll-mt-6 space-y-6">
                <Typography variant="title-1" emphasis={true}>
                  Segmented Controls
                </Typography>
                <div className="space-y-6 rounded-xl bg-black/1.5 p-6 dark:bg-white/1.5">
                  <div className="space-y-3">
                    <Typography variant="headline">Default</Typography>
                    <div className="flex flex-wrap gap-4">
                      <SegmentedControl value={viewMode} onValueChange={setViewMode}>
                        <Segment value="list">List</Segment>
                        <Segment value="grid">Grid</Segment>
                      </SegmentedControl>
                      <SegmentedControl value={sortBy} onValueChange={setSortBy}>
                        <Segment value="name">Name</Segment>
                        <Segment value="date">Date</Segment>
                        <Segment value="size">Size</Segment>
                      </SegmentedControl>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Typography variant="headline">Glass Variant</Typography>
                    <SegmentedControl defaultValue="all" glass={true}>
                      <Segment value="all">All</Segment>
                      <Segment value="photos">Photos</Segment>
                      <Segment value="videos">Videos</Segment>
                      <Segment value="docs">Documents</Segment>
                    </SegmentedControl>
                  </div>
                  <div className="space-y-3">
                    <Typography variant="headline">Disclosure Button</Typography>
                    <div className="space-y-2">
                      <DisclosureButton expanded={disclosureExpanded} onExpandedChange={setDisclosureExpanded}>
                        Advanced Options
                      </DisclosureButton>
                      {disclosureExpanded && (
                        <div className="space-y-2 pl-5 text-[13px] text-gray-600 dark:text-gray-400">
                          <div>Option 1: Enable feature flags</div>
                          <div>Option 2: Show hidden files</div>
                          <div>Option 3: Developer mode</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* Pop-up/Pull-down Section */}
              <section id="section-pop-up-pull-down" className="scroll-mt-6 space-y-6">
                <Typography variant="title-1" emphasis={true}>
                  Pop-up/Pull-down
                </Typography>
                <div className="space-y-6 rounded-xl bg-black/1.5 p-6 dark:bg-white/1.5">
                  <div className="space-y-3">
                    <Typography variant="headline">Pop-Up Button</Typography>
                    <DropdownMenu>
                      <PopUpButton value={selectedFont} />
                      <MenuContent>
                        <MenuItem checked={selectedFont === "SF Pro"} onClick={() => setSelectedFont("SF Pro")}>
                          SF Pro
                        </MenuItem>
                        <MenuItem checked={selectedFont === "SF Mono"} onClick={() => setSelectedFont("SF Mono")}>
                          SF Mono
                        </MenuItem>
                        <MenuItem checked={selectedFont === "New York"} onClick={() => setSelectedFont("New York")}>
                          New York
                        </MenuItem>
                        <MenuSeparator />
                        <MenuItem checked={selectedFont === "Helvetica"} onClick={() => setSelectedFont("Helvetica")}>
                          Helvetica
                        </MenuItem>
                        <MenuItem checked={selectedFont === "Arial"} onClick={() => setSelectedFont("Arial")}>
                          Arial
                        </MenuItem>
                      </MenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="space-y-3">
                    <Typography variant="headline">Pulldown Button</Typography>
                    <div className="flex flex-wrap gap-4">
                      <DropdownMenu>
                        <PulldownButton label="Actions" />
                        <MenuContent>
                          <MenuItem icon={<FilePlus className="h-4 w-4" />}>New Document</MenuItem>
                          <MenuItem icon={<FolderPlus className="h-4 w-4" />}>New Folder</MenuItem>
                          <MenuSeparator />
                          <MenuItem icon={<Clipboard className="h-4 w-4" />} shortcut="⌘C">
                            Copy
                          </MenuItem>
                          <MenuItem icon={<ClipboardPaste className="h-4 w-4" />} shortcut="⌘V">
                            Paste
                          </MenuItem>
                          <MenuSeparator />
                          <MenuItem icon={<Trash2 className="h-4 w-4" />}>Delete</MenuItem>
                        </MenuContent>
                      </DropdownMenu>
                      <DropdownMenu>
                        <PulldownButton label="File" size="sm" />
                        <MenuContent>
                          <MenuHeader>Recent Files</MenuHeader>
                          <MenuItem>Document.txt</MenuItem>
                          <MenuItem>Notes.md</MenuItem>
                          <MenuItem>Script.js</MenuItem>
                        </MenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Typography variant="headline">Popover</Typography>
                    <div className="flex gap-4">
                      <Popover>
                        <PopoverTrigger asChild={true}>
                          <Button variant="secondary">Show Info</Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <div className="space-y-2">
                            <Typography variant="headline">Information</Typography>
                            <Typography variant="body" className="text-gray-500">
                              This is a popover with Tahoe glass styling.
                            </Typography>
                          </div>
                        </PopoverContent>
                      </Popover>
                      <Popover>
                        <PopoverTrigger asChild={true}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg bg-black/5">
                            <HelpCircle className="h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-62.5">
                          <div className="space-y-2">
                            <Typography variant="headline">Quick Help</Typography>
                            <Typography variant="caption-1" className="text-gray-500">
                              Press ⌘K to open the command palette.
                            </Typography>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
              </section>

              {/* Sidebars Section */}
              <section id="section-sidebars" className="scroll-mt-6 space-y-6">
                <Typography variant="title-1" emphasis={true}>
                  Sidebars
                </Typography>
                <div className="rounded-xl bg-black/1.5 p-6 dark:bg-white/1.5">
                  <div className="max-w-56 space-y-4">
                    <SidebarSection title="Favorites">
                      <SidebarItem icon={<Folder className="h-4 w-4" />}>Documents</SidebarItem>
                      <SidebarItem icon={<Folder className="h-4 w-4" />} state="selected">
                        Downloads
                      </SidebarItem>
                      <SidebarItem icon={<Folder className="h-4 w-4" />}>Desktop</SidebarItem>
                    </SidebarSection>
                    <SidebarSection title="Tags">
                      <SidebarItem icon={<CircleDot className="h-4 w-4 text-red-500" />}>Red</SidebarItem>
                      <SidebarItem icon={<CircleDot className="h-4 w-4 text-blue-500" />}>Blue</SidebarItem>
                      <SidebarItem icon={<CircleDot className="h-4 w-4 text-green-500" />}>Green</SidebarItem>
                    </SidebarSection>
                  </div>
                </div>
              </section>

              {/* Lists and Tables Section */}
              <section id="section-lists-tables" className="scroll-mt-6 space-y-6">
                <Typography variant="title-1" emphasis={true}>
                  Lists and Tables
                </Typography>
                <div className="overflow-hidden rounded-2xl bg-white dark:bg-black/20">
                  <div className="flex h-8 items-center border-black/5 border-b bg-gray-50/50 px-4 dark:bg-white/5">
                    <Typography variant="caption-1" className="w-1/2 font-bold text-gray-500">
                      Name
                    </Typography>
                    <Typography variant="caption-1" className="w-1/4 font-bold text-gray-500">
                      Status
                    </Typography>
                    <Typography variant="caption-1" className="w-1/4 font-bold text-gray-500">
                      Priority
                    </Typography>
                  </div>
                  <div className="flex flex-col">
                    <ListItem
                      variant={selectedListItem === "buttons" ? "selected" : "zebra"}
                      className="flex cursor-pointer"
                      onClick={() => setSelectedListItem("buttons")}
                    >
                      <span className="flex w-1/2 items-center gap-2">
                        <Folder className="h-4 w-4 text-blue-500" /> Buttons
                      </span>
                      <span className="w-1/4 text-green-600 dark:text-green-400">Stable</span>
                      <span className="w-1/4 opacity-70">High</span>
                    </ListItem>
                    <ListItem
                      variant={selectedListItem === "overlays" ? "selected" : "default"}
                      className="flex cursor-pointer"
                      onClick={() => setSelectedListItem("overlays")}
                    >
                      <span className="flex w-1/2 items-center gap-2">
                        <Folder className="h-4 w-4 text-blue-500" /> Overlays
                      </span>
                      <span className="w-1/4">In Review</span>
                      <span className="w-1/4">High</span>
                    </ListItem>
                    <ListItem
                      variant={selectedListItem === "tooltip" ? "selected" : "zebra"}
                      className="flex cursor-pointer"
                      onClick={() => setSelectedListItem("tooltip")}
                    >
                      <span className="ml-4 flex w-1/2 items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-400" /> Tooltip.tsx
                      </span>
                      <span className="w-1/4 text-green-600 dark:text-green-400">Stable</span>
                      <span className="w-1/4 opacity-70">Medium</span>
                    </ListItem>
                    <ListItem
                      variant={selectedListItem === "alert" ? "selected" : "default"}
                      className="flex cursor-pointer"
                      onClick={() => setSelectedListItem("alert")}
                    >
                      <span className="ml-4 flex w-1/2 items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-400" /> Alert.tsx
                      </span>
                      <span className="w-1/4 text-blue-500">In Progress</span>
                      <span className="w-1/4 opacity-70">Medium</span>
                    </ListItem>
                  </div>
                </div>
              </section>

              {/* Alerts Section */}
              <section id="section-alerts" className="scroll-mt-6 space-y-6">
                <Typography variant="title-1" emphasis={true}>
                  Alerts
                </Typography>
                <div className="rounded-xl bg-black/1.5 p-6 dark:bg-white/1.5">
                  <Button variant="destructive" onClick={() => setShowAlert(true)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Show Alert Dialog
                  </Button>
                </div>
              </section>

              {/* Tooltips Section */}
              <section id="section-tooltips" className="scroll-mt-6 space-y-6">
                <Typography variant="title-1" emphasis={true}>
                  Tooltips
                </Typography>
                <div className="rounded-xl bg-black/1.5 p-6 dark:bg-white/1.5">
                  <div className="flex gap-4">
                    <Tooltip>
                      <TooltipTrigger asChild={true}>
                        <Button variant="secondary">Hover me</Button>
                      </TooltipTrigger>
                      <TooltipContent>This is a tooltip</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild={true}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg bg-black/5">
                          <Info className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Information</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild={true}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg bg-black/5">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Settings</TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </section>

              {/* Scrollbar Section */}
              <section id="section-scrollbar" className="scroll-mt-6 space-y-6">
                <Typography variant="title-1" emphasis={true}>
                  Scrollbar
                </Typography>
                <div className="space-y-6 rounded-xl bg-black/1.5 p-6 dark:bg-white/1.5">
                  <div className="space-y-3">
                    <Typography variant="headline">Vertical Scrollbar</Typography>
                    <div className="flex items-start gap-6">
                      <div className="relative h-48 w-64 rounded-lg bg-white dark:bg-black/20">
                        <div className="h-full overflow-hidden p-4 pr-4">
                          <Typography variant="body" className="text-gray-600 dark:text-gray-400">
                            This is a scrollable content area demonstrating the custom scrollbar component. The
                            scrollbar appears on the right side and can be dragged to scroll through content.
                            <br />
                            <br />
                            The thumb size automatically adjusts based on the visible ratio of content. When there's
                            more content, the thumb becomes smaller.
                            <br />
                            <br />
                            You can click on the track to jump to a position, or drag the thumb directly.
                          </Typography>
                        </div>
                        <Scrollbar
                          orientation="vertical"
                          position={scrollPos1}
                          visibleRatio={0.4}
                          onPositionChange={setScrollPos1}
                          className="absolute top-0 right-0"
                        />
                      </div>
                      <div className="relative h-48 w-64 rounded-lg bg-white dark:bg-black/20">
                        <div className="h-full overflow-hidden p-4 pr-4">
                          <Typography variant="body" className="text-gray-600 dark:text-gray-400">
                            Another example with different scroll position and visible ratio. The scrollbar thumb is
                            positioned further down.
                          </Typography>
                        </div>
                        <Scrollbar
                          orientation="vertical"
                          position={scrollPos2}
                          visibleRatio={0.3}
                          onPositionChange={setScrollPos2}
                          className="absolute top-0 right-0"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Typography variant="headline">Horizontal Scrollbar</Typography>
                    <div className="flex flex-col gap-4">
                      <div className="relative w-80 rounded-lg bg-white dark:bg-black/20">
                        <div className="overflow-hidden p-4 pb-6">
                          <Typography variant="body" className="whitespace-nowrap text-gray-600 dark:text-gray-400">
                            This content is wider than the container and can be scrolled horizontally using the
                            scrollbar below.
                          </Typography>
                        </div>
                        <Scrollbar
                          orientation="horizontal"
                          position={scrollPosH}
                          visibleRatio={0.5}
                          onPositionChange={setScrollPosH}
                          className="absolute right-0 bottom-0 left-0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </Window>

        <Alert
          open={showAlert}
          onOpenChange={setShowAlert}
          title="Empty Trash?"
          description="All items in the trash will be permanently deleted. This action cannot be undone."
          primaryAction={{
            label: "Empty Trash",
            variant: "destructive",
            onClick: () => setShowAlert(false),
          }}
          cancelAction={{
            label: "Cancel",
            onClick: () => setShowAlert(false),
          }}
        />
      </div>
    </TooltipProvider>
  );
}

export default App;
