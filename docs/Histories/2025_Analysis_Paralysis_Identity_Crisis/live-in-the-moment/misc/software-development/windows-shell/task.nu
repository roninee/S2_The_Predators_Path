

def get_duration [ ss ] {
	$ss | each {|it| ( (date now) - ($it|into datetime ) | $"($in)" | split row ' ' | get 0 ) }   

}

def replace_priority [ priority: string ] {
echo $priority
	if $priority == 'H' {
          "⚡"
        } else if $priority == "L" {
          "👇"
        } else {
	"🌿"
	} 

}

def replace_status [status] {
	if $status == "complete" {
          "❌"
        } else if $status == "" {
	"✅"
        } else {
	"🎈"
	}
}

def task [] {

	
	let tasks = (open c:\Workspace\Documents\Change.Your.Thinking\todo.json) 
	
	let create_at = (get_duration $tasks.create_at | wrap create_at )
	let modified_at = (get_duration $tasks.modified_at| wrap modified_at )
	
	 $tasks |reject create_at modified_at | merge {$create_at } | merge {$modified_at} | 
	 update cells -c [status] {|value| replace_status $value }  | 
	 update cells -c [priority] {|value| replace_priority $value }  |
	 rename -c [priority P] |
	 rename -c [status S] 
	

}

def "task add" [
	desc: string,
	--priority (-p): string = N,
	--label (-l): string = undefined
] {

	let tasks = (open c:\Workspace\Documents\Change.Your.Thinking\todo.json) 
	
	let nt = ($tasks | append {
	id: ($tasks.id | math max | $in + 1)
	description: $desc
	status: pending
	create_at: (date now)
	modified_at: (date now)
	start_at: ''
	project: undefined
	priority: $priority
	label: $label
	})
	
	$nt | save c:\Workspace\Documents\Change.Your.Thinking\todo.json 
	echo $nt

}